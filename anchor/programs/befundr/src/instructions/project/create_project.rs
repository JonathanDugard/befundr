use anchor_lang::prelude::*;

use crate::{
    constants::project::{
        MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH, MAX_PROJECT_CAMPAIGN_DURATION, MAX_REWARDS_NUMBER,
        MAX_URL_LENGTH, MIN_PROJECT_GOAL_AMOUNT, MIN_REWARDS_NUMBER,
    },
    errors::CreateProjectError,
    state::{Project, Reward, Status, User},
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
) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;

    require!(name.len() as u64 <= MAX_NAME_LENGTH, CreateProjectError::NameTooLong);
    require!(image_url.len() as u64 <= MAX_URL_LENGTH, CreateProjectError::ImageUrlTooLong);
    require!(
        description.len() as u64 <= MAX_DESCRIPTION_LENGTH,
        CreateProjectError::DescriptionTooLong
    );
    require!(goal_amount > MIN_PROJECT_GOAL_AMOUNT, CreateProjectError::GoalAmountBelowLimit);

    require!(end_time > now, CreateProjectError::EndTimeBeforeCreatedTime);
    require!(
        end_time < now + MAX_PROJECT_CAMPAIGN_DURATION,
        CreateProjectError::ExceedingEndTime
    );
    require!(rewards.len() as u16 >= MIN_REWARDS_NUMBER, CreateProjectError::NotEnoughRewards);
    require!(rewards.len() as u16 <= MAX_REWARDS_NUMBER, CreateProjectError::TooManyRewards);

    for reward in rewards.iter() {
        reward.validate()?;
    }

    ctx.accounts.project.owner = ctx.accounts.signer.key();
    ctx.accounts.project.user = ctx.accounts.user.key();
    ctx.accounts.project.name = name;
    ctx.accounts.project.image_url = image_url;
    ctx.accounts.project.description = description;
    ctx.accounts.project.goal_amount = goal_amount;
    ctx.accounts.project.raised_amount = 0;
    ctx.accounts.project.created_time = now;

    ctx.accounts.project.end_time = end_time;
    ctx.accounts.project.status = Status::Fundraising;
    ctx.accounts.project.rewards = rewards;

    if safety_deposit > 0 {
        //TODO Handle deposit in USDC
    }
    ctx.accounts.project.safety_deposit = safety_deposit;

    // Increment project user counter
    ctx.accounts.user.created_project_counter += 1;

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

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}