use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

use crate::{
    constants::project::{
        MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH, MAX_PROJECT_CAMPAIGN_DURATION, MAX_REWARDS_NUMBER,
        MAX_URL_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_NAME_LENGTH, MIN_PROJECT_GOAL_AMOUNT,
        MIN_REWARDS_NUMBER, MIN_SAFETY_DEPOSIT,
    },
    errors::{AtaError, CreateProjectError},
    state::{
        Project, ProjectCategory, ProjectContributions, ProjectStatus, Reward, UnlockRequests, User,
    },
    utils::transfer_spl_token,
};

pub fn create_project(
    ctx: Context<CreateProject>,
    name: String,
    image_url: String,
    description: String,
    goal_amount: u64,
    end_time: i64,
    rewards: Vec<Reward>,
    safety_deposit: u64,
    x_account_url: String,
    category: ProjectCategory,
) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;

    let name_length = name.len() as u64;
    require!(name_length >= MIN_NAME_LENGTH, CreateProjectError::NameTooShort);
    require!(name_length <= MAX_NAME_LENGTH, CreateProjectError::NameTooLong);

    require!(image_url.len() as u64 <= MAX_URL_LENGTH, CreateProjectError::ImageUrlTooLong);

    let description_length = description.len() as u64;
    require!(
        description_length >= MIN_DESCRIPTION_LENGTH,
        CreateProjectError::DescriptionTooShort
    );
    require!(
        description_length <= MAX_DESCRIPTION_LENGTH,
        CreateProjectError::DescriptionTooLong
    );
    require!(x_account_url.len() as u64 <= MAX_URL_LENGTH, CreateProjectError::UrlTooLong);
    require!(goal_amount > MIN_PROJECT_GOAL_AMOUNT, CreateProjectError::GoalAmountBelowLimit);
    require!(end_time > now, CreateProjectError::EndTimeInPast);
    require!(
        end_time < now + MAX_PROJECT_CAMPAIGN_DURATION,
        CreateProjectError::ExceedingEndTime
    );
    require!(rewards.len() as u16 >= MIN_REWARDS_NUMBER, CreateProjectError::NotEnoughRewards);
    require!(rewards.len() as u16 <= MAX_REWARDS_NUMBER, CreateProjectError::TooManyRewards);
    require!(
        safety_deposit >= MIN_SAFETY_DEPOSIT,
        CreateProjectError::InsufficientSafetyDeposit
    );

    for reward in rewards.iter() {
        reward.validate()?;
    }

    let signer = &ctx.accounts.signer;
    let project = &mut ctx.accounts.project;

    project.owner = ctx.accounts.signer.key();
    project.user = ctx.accounts.user.key();
    project.name = name;
    project.image_url = image_url;
    project.description = description;
    project.x_account_url = x_account_url;
    project.goal_amount = goal_amount;
    project.raised_amount = 0;
    project.created_time = now;
    project.end_time = end_time;
    project.status = ProjectStatus::Fundraising;
    project.rewards = rewards;
    project.category = category;

    let to_ata = &ctx.accounts.to_ata;
    let from_ata = &ctx.accounts.from_ata;
    let token_program = &ctx.accounts.token_program;

    require!(from_ata.owner == signer.key(), AtaError::WrongAtaOwner);
    require!(to_ata.owner == project.key(), AtaError::WrongAtaOwner);

    transfer_spl_token(token_program, from_ata, to_ata, signer, safety_deposit)?;
    project.safety_deposit = safety_deposit;

    ctx.accounts.user.created_project_counter += 1;
    ctx.accounts.unlock_requests.project = project.key();

    Ok(())
}

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(mut)]
    pub user: Account<'info, User>,

    #[account(
    init,
    payer = signer,
    space = 8 + Project::INIT_SPACE,
    seeds = [b"project", user.key().as_ref(), &(user.created_project_counter + 1).to_le_bytes()],
    bump
    )]
    pub project: Account<'info, Project>,

    #[account(
        init,
        payer = signer,
        space = 8 + ProjectContributions::INIT_SPACE,
        seeds = [b"project_contributions", project.key().as_ref()],
        bump
    )]
    pub project_contributions: Account<'info, ProjectContributions>,

    #[account(
        init,
        payer = signer,
        space = 8 + UnlockRequests::INIT_SPACE,
        seeds = [b"project_unlock_requests", project.key().as_ref()],
        bump
    )]
    pub unlock_requests: Account<'info, UnlockRequests>,

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
