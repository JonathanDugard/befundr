use anchor_lang::prelude::*;

use crate::{
    constants::unlock_request::{
        MAX_REQUESTED_PERCENTAGE_AMOUNT, REJECTED_REQUEST_COOLDOWN, REQUEST_COOLDOWN, VOTING_PERIOD,
    },
    errors::CreateUnlockRequestError,
    state::{Project, ProjectStatus, UnlockRequest, UnlockRequests, UnlockStatus, User},
};

pub fn create_unlock_request(
    ctx: Context<CreateUnlockRequest>,
    amount_requested: u64,
) -> Result<()> {
    let now: i64 = Clock::get()?.unix_timestamp;

    let project = &ctx.accounts.project;
    let unlock_requests = &mut ctx.accounts.unlock_requests;
    let new_unlock_request = &mut ctx.accounts.new_unlock_request;

    require!(
        project.status == ProjectStatus::Realising,
        CreateUnlockRequestError::WrongProjectStatus
    );

    let max_allowed_amount = project.raised_amount * MAX_REQUESTED_PERCENTAGE_AMOUNT / 100;

    require!(
        amount_requested <= max_allowed_amount,
        CreateUnlockRequestError::RequestedAmountTooHigh
    );
    require!(
        project.raised_amount - unlock_requests.unlocked_amount >= amount_requested,
        CreateUnlockRequestError::NotEnoughFunds
    );

    //If there is already an unlock request ongoing, do additional checks
    if let Some(current_unlock_request_vote) = &ctx.accounts.current_unlock_request {
        let mut vote_cooldown = REQUEST_COOLDOWN;

        require!(
            current_unlock_request_vote.end_time < now,
            CreateUnlockRequestError::UnlockVoteAlreadyOngoing
        );
        if current_unlock_request_vote.status == UnlockStatus::Rejected {
            vote_cooldown = REJECTED_REQUEST_COOLDOWN;
        }

        //Check that the cooldown is elapsed
        require!(
            current_unlock_request_vote.created_time + vote_cooldown <= now,
            CreateUnlockRequestError::WaitBeforeNewRequest
        );
    }

    new_unlock_request.project = project.key();
    new_unlock_request.amount_requested = amount_requested;
    new_unlock_request.created_time = now;
    new_unlock_request.end_time = now + VOTING_PERIOD;
    new_unlock_request.status = UnlockStatus::Approved;

    unlock_requests.request_counter += 1;
    unlock_requests.requests.push(new_unlock_request.key());

    Ok(())
}

#[derive(Accounts)]
pub struct CreateUnlockRequest<'info> {
    #[account(has_one = owner)]
    pub user: Account<'info, User>,

    #[account(mut,
    has_one = project,
    seeds = [b"project_unlock_requests", project.key().as_ref()],
    bump
  )]
    pub unlock_requests: Account<'info, UnlockRequests>,

    #[account(
    init,
    payer = owner,
    space = 8 + UnlockRequest::INIT_SPACE,
    seeds = [b"unlock_request", project.key().as_ref(), &(unlock_requests.request_counter + 1).to_le_bytes()],
    bump
  )]
    pub new_unlock_request: Account<'info, UnlockRequest>,

    #[account(has_one = project,
      seeds = [b"unlock_request", project.key().as_ref(), &(unlock_requests.request_counter + 0).to_le_bytes()],
      bump
    )]
    pub current_unlock_request: Option<Account<'info, UnlockRequest>>,

    #[account(has_one = user)]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}
