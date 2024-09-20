use anchor_lang::prelude::*;

use crate::state::{Project, User, Reward, Status};

pub fn create_project(
        ctx: Context<CreateProject>,
        name: String,
        image_url: String,
        description: String,
        goal_amount: u64,
        end_time: i64,
        rewards: Vec<Reward>,
    ) -> Result<()> {

    ctx.accounts.project.owner = ctx.accounts.signer.key();
    ctx.accounts.project.user = ctx.accounts.user.key();
    ctx.accounts.project.name = name;
    ctx.accounts.project.image_url = image_url;
    ctx.accounts.project.description = description;
    ctx.accounts.project.goal_amount = goal_amount;
    ctx.accounts.project.raised_amount = 0;
    ctx.accounts.project.created_time = Clock::get()?.unix_timestamp;
    ctx.accounts.project.end_time = end_time;
    ctx.accounts.project.status = Status::Fundraising;
    ctx.accounts.project.rewards = rewards;

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
        seeds = [
            b"project", 
            user.key().as_ref(),
            &(user.created_project_counter + 1).to_le_bytes(),
        ],
        bump
    )]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}