use crate::{
    errors::{ContributionError, RewardError},
    state::{
        Contribution, Project, ProjectContributions, ProjectStatus, Reward, User, UserContributions,
    },
    utils::spl_transfer_builder::SplTransferBuilder,
};
use anchor_lang::prelude::*;
//use anchor_spl::mint::USDC;
use anchor_spl::token::{Token, TokenAccount};

pub fn add_contribution(
    ctx: Context<AddContribution>,
    amount: u64,
    reward_id: Option<u64>,
) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;
    let project = &mut ctx.accounts.project;
    let user = &ctx.accounts.user;
    let user_contributions = &mut ctx.accounts.user_contributions;
    let contribution = &mut ctx.accounts.contribution;
    let project_contributions = &mut ctx.accounts.project_contributions;

    // Check if the project is in a fundraising state and in fundraising period
    require!(
        project.status == ProjectStatus::Fundraising,
        ContributionError::ProjectNotFundraising
    );
    require!(project.end_time > now, ContributionError::ProjectNotFundraising);

    // Verify that the signer is the actual user pda owner
    require!(user.owner == ctx.accounts.signer.key(), ContributionError::SignerNotUser);

    // Amount must be positive and greater than 0
    require!(amount > 0, ContributionError::RewardAlreadyReserved);

    let mut reward: Option<&mut Reward> = None;
    if reward_id.is_some() {
        reward_validation(project, amount, reward_id.unwrap())?;
        // set a mutable variable with project reward
        reward = project.rewards.get_mut(reward_id.unwrap() as usize);
    }
    // Update reward supply
    if let Some(reward) = reward {
        reward.add_supply()?;
        contribution.is_claimed = Some(false);
    }

    // Initialize the Contribution PDA if all checks pass
    contribution.initial_owner = user.key();
    contribution.current_owner = user.key();
    contribution.project = project.key();
    contribution.amount = amount;
    contribution.reward_id = reward_id;
    contribution.creation_timestamp = now;
    contribution.set_active();

    // Update project's datas
    project.raised_amount += amount;
    project.contribution_counter += 1;

    // Update ProjectContributions List
    project_contributions.contributions.push(contribution.key());

    // Update user contributions
    user_contributions.contributions.push(contribution.key());

    // Transfer the contribution amount in USDC to the project
    // Prepare SPL transfer call
    let token_program = &ctx.accounts.token_program;
    let to_ata = &ctx.accounts.to_ata;
    let from_ata = &ctx.accounts.from_ata;
    let authority = &ctx.accounts.signer;

    SplTransferBuilder::new((*token_program).clone())
        .send(amount)
        .from((*from_ata).clone())
        .to((*to_ata).clone())
        .signed_by((*authority).clone())?;

    Ok(())
}

pub fn reward_validation(project: &Project, amount: u64, reward_id: u64) -> Result<()> {
    // We need to ensure the selected reward exists in the project rewards list
    if let Some(reward) = project.rewards.get(reward_id as usize) {
        // Validate that the contribution amount is sufficient for the selected reward
        require!(amount >= reward.price, ContributionError::RewardPriceError);
        // Validate and update the reward supply
        if let Some(max_supply) = reward.max_supply {
            require!(reward.current_supply < max_supply as u32, RewardError::RewardSupplyReach);
        }
    }

    Ok(())
}

#[derive(Accounts)]
pub struct AddContribution<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub project_contributions: Account<'info, ProjectContributions>,

    pub user: Account<'info, User>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + UserContributions::INIT_SPACE,
        seeds = [b"user_contributions", user.key().as_ref()],
        bump
    )]
    pub user_contributions: Account<'info, UserContributions>,

    #[account(
        init,
        payer = signer,
        space = 8 + Contribution::INIT_SPACE,
        seeds = [b"contribution", project.key().as_ref(), &(project.contribution_counter + 1).to_le_bytes()],
        bump
    )]
    pub contribution: Account<'info, Contribution>,

    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
