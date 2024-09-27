// Cancel contribution by contribution's signer
// The signer is redeem with the contribution amount
// from project PDA balance to his wallet
use crate::{
    errors::ContributionError,
    state::{Contribution, Project, ProjectStatus, Reward, User},
};
use anchor_lang::prelude::*;

pub fn cancel_contribution(ctx: Context<CancelContribution>) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;
    let project = &mut ctx.accounts.project;
    let user = &ctx.accounts.user;
    let signer = &mut ctx.accounts.signer;
    let contribution = &mut ctx.accounts.contribution;

    // Check if the project is in a fundraising state and in fundraising period
    require!(
        project.status == ProjectStatus::Fundraising,
        ContributionError::ProjectNotFundraising
    );
    require!(project.end_time > now, ContributionError::ProjectNotFundraising);

    // Check if the Contribution PDA exists and belongs to the user
    // Add USDC balance > 0 check to transfer USDC to user wallet before closing
    require!(contribution.current_owner == user.key(), ContributionError::Unauthorized);
    require!(signer.key() == user.owner, ContributionError::Unauthorized);

    // Transfer the contribution amount back to the user
    /* Todo: handle USDC ATA refund transfer
     *   - Get USDC contribution balance
     *   - Call transfer SPL token from contribution ATA to user wallet ATA
     *   - Transfer funds
     */

    // Update the project's raised_amount and contribution_counter
    project.raised_amount -= contribution.amount; // Todo: handle USDC ATA

    let mut reward: Option<&mut Reward> = None;
    if contribution.reward_id.is_some() {
        reward = project
            .rewards
            .get_mut(contribution.reward_id.unwrap() as usize);
    }

    // Update project reward current supply
    if let Some(reward) = reward {
        reward.remove_supply()?;
    }

    // Update contribution status
    contribution.set_cancelled();

    Ok(())
}

#[derive(Accounts)]
pub struct CancelContribution<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,

    pub user: Account<'info, User>,

    #[account(mut, close = signer)]
    pub contribution: Account<'info, Contribution>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
