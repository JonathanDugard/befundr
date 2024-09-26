use crate::{
    errors::ContributionError,
    state::{Contribution, Project, Reward, Status, User},
};
use anchor_lang::prelude::*;

pub fn add_contribution(ctx: Context<AddContribution>, amount: u64, reward_id: u64) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;
    let project = &mut ctx.accounts.project;
    let user = &ctx.accounts.user;
    let contribution_pda = &mut ctx.accounts.contribution;

    // Check if the project is in a fundraising state and in fundraising period
    require!(project.status == Status::Fundraising, ContributionError::ProjectNotFundraising);
    require!(project.end_time > now, ContributionError::ProjectNotFundraising);

    // 2. Verify that the signer is the actual user pda owner
    require!(user.owner == ctx.accounts.signer.key(), ContributionError::SignerNotUser);

    // We need to ensure the selected reward exists in the project rewards list
    // DEV NOTES: it's not the best way to check if a selected reward
    // is the right one from a project, a model update will be needed
    // to be more strict with rewards uid instead of an vector index.
    let reward: &Reward = project
        .rewards
        .get(reward_id as usize)
        .ok_or(ContributionError::RewardError)?;

    // Validate that the contribution amount is sufficient for the selected reward
    require!(amount >= reward.price, ContributionError::RewardPriceError);

    // Check if the Contribution PDA already exists
    require!(contribution_pda.amount == 0, ContributionError::RewardAlreadyReserved);

    // Transfer the contribution amount in lamports to the project

    // TODO: handle USDC ATA
    **project.to_account_info().try_borrow_mut_lamports()? += amount;
    **user.to_account_info().try_borrow_mut_lamports()? -= amount;

    /*
     *  Data updates
     */

    // Initialize the Contribution PDA if all checks pass
    contribution_pda.initial_owner = user.key();
    contribution_pda.current_owner = user.key();
    contribution_pda.amount = amount;
    contribution_pda.reward_id = reward_id;
    contribution_pda.timestamp = now;
    contribution_pda.is_for_sale = false;
    contribution_pda.selling_price = None;

    // Update the project's raised_amount with the new contribution
    // Should be named with usdc prefix: usdc_raised_amount
    // Todo: handle USDC
    project.raised_amount += amount;

    // Update the project's contribution_counter and the user's contribution amount
    project.contribution_counter += 1;

    // Update project reward current supply
    if let Some(reward) = project.rewards.get_mut(reward_id as usize) {
        reward.current_supply += 1;
    } else {
        return Err(ContributionError::RewardError.into());
    }

    Ok(())
}

#[derive(Accounts)]
pub struct AddContribution<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub user: Account<'info, User>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + Contribution::INIT_SPACE,
        seeds = [b"contribution", project.key().as_ref(), &(project.contribution_counter + 1).to_le_bytes()],
        bump
    )]
    pub contribution: Account<'info, Contribution>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
