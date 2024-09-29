use crate::{
    errors::{ContributionError, RewardError, TransferError},
    state::{
        Contribution, Project, ProjectContributions, ProjectStatus, Reward, User, UserContributions,
    },
};
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
// use anchor_spl::token::{self, SplTransfer, Token, TokenAccount};

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
    }

    // Initialize the Contribution PDA if all checks pass
    contribution.initial_owner = user.key();
    contribution.current_owner = user.key();
    contribution.project = project.key();
    contribution.amount = amount;
    contribution.reward_id = reward_id;
    contribution.creation_timestamp = now;
    contribution.is_for_sale = false;
    contribution.selling_price = None;
    contribution.set_active();

    // Update project's datas
    project.raised_amount += amount;
    project.contribution_counter += 1;

    // Update ProjectContributions List
    project_contributions.contributions.push(contribution.key());

    // Update user contributions
    user_contributions.contributions.push(contribution.key());

    // Transfer the contribution amount in USDC to the project
    transfer_lamports_funds(&ctx, amount)?;
    // transfer_spl_funds(&ctx, amount);

    Ok(())
}

fn transfer_lamports_funds(ctx: &Context<AddContribution>, amount: u64) -> Result<()> {
    let transfer_instruction = Transfer {
        from: ctx.accounts.signer.to_account_info(),
        to: ctx.accounts.project.to_account_info(),
    };
    let cpi_ctx =
        CpiContext::new(ctx.accounts.system_program.to_account_info(), transfer_instruction);

    match transfer(cpi_ctx, amount.into()) {
        Ok(_) => Ok(()),
        Err(error) => {
            msg!("Error during the contribution transfer: {:?}", error);
            Err(TransferError::TransferFailed.into())
        },
    }
}

// fn transfer_spl_tokens(ctx: Context<AddContribution>, amount: u64) -> Result<()> {
//     let destination = &ctx.accounts.to_ata;
//     let source = &ctx.accounts.from_ata;
//     let token_program = &ctx.accounts.token_program;
//     let authority = &ctx.accounts.from;

//     // Transfer tokens from taker to initializer
//     let cpi_accounts = SplTransfer {
//         from: source.to_account_info().clone(),
//         to: destination.to_account_info().clone(),
//         authority: authority.to_account_info().clone(),
//     };
//     let cpi_program = token_program.to_account_info();

//     token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;
//     Ok(())
// }

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
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
