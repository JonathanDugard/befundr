// Cancel contribution by contribution's signer
// The signer is redeem with the contribution amount
// from project PDA balance to his wallet
use crate::{
    errors::ContributionError,
    state::{Contribution, Project, Status, User},
};
use anchor_lang::prelude::*;

pub fn cancel_contribution(ctx: Context<CancelContribution>) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;
    let project = &mut ctx.accounts.project;
    let user = &mut ctx.accounts.user;
    let signer = &mut ctx.accounts.signer;
    let contribution = &mut ctx.accounts.contribution;

    // Check if the project is in a fundraising state and in fundraising period
    require!(project.status == Status::Fundraising, ContributionError::ProjectNotFundraising);
    require!(project.end_time > now, ContributionError::ProjectNotFundraising);

    // Check if the Contribution PDA exists and belongs to the user
    // Add USDC balance > 0 check to transfer USDC to user wallet before closing
    require!(contribution.current_owner == user.key(), ContributionError::Unauthorized);

    // Transfer the contribution amount back to the user
    // Todo: handle USDC ATA
    **project.to_account_info().try_borrow_mut_lamports()? -= contribution.amount;
    **user.to_account_info().try_borrow_mut_lamports()? += contribution.amount;

    // Update the project's raised_amount and contribution_counter
    project.raised_amount -= contribution.amount; // Todo: handle USDC
    project.contribution_counter -= 1;

    // Update project reward current supply
    if let Some(reward) = project.rewards.get_mut(contribution.reward_id as usize) {
        reward.current_supply -= 1;
    } else {
        return Err(ContributionError::RewardError.into());
    }

    // Close the Contribution PDA
    contribution.close(signer.to_account_info())?;

    Ok(())
}

#[derive(Accounts)]
pub struct CancelContribution<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub user: Account<'info, User>,

    #[account(mut, close = signer)]
    pub contribution: Account<'info, Contribution>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
