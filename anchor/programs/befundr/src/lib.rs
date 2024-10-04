use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

use instructions::*;
use state::{ProjectCategory, Reward};

declare_id!("GwhXp6uzcsDPb8Git18t1pKAqE7zb9Jmviay6ffBdXfk");

#[program]
pub mod befundr {

    use super::*;

    /* User */

    pub fn create_user(
        ctx: Context<CreateUser>,
        name: Option<String>,
        avatar_url: Option<String>,
        bio: Option<String>,
        city: Option<String>,
    ) -> Result<()> {
        instructions::create_user(ctx, name, avatar_url, bio, city)
    }

    pub fn update_user(
        ctx: Context<UpdateUser>,
        name: Option<String>,
        avatar_url: Option<String>,
        bio: Option<String>,
        city: Option<String>,
    ) -> Result<()> {
        instructions::update_user(ctx, name, avatar_url, bio, city)
    }

    pub fn delete_user(ctx: Context<DeleteUser>) -> Result<()> {
        instructions::delete_user(ctx)
    }

    /* Project */

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
        instructions::create_project(
            ctx,
            name,
            image_url,
            description,
            goal_amount,
            end_time,
            rewards,
            safety_deposit,
            x_account_url,
            category,
        )
    }

    /* Contribution */

    pub fn add_contribution(
        ctx: Context<AddContribution>,
        amount: u64,
        reward_id: Option<u64>,
    ) -> Result<()> {
        instructions::add_contribution(ctx, amount, reward_id)
    }

    pub fn cancel_contribution(ctx: Context<CancelContribution>) -> Result<()> {
        instructions::cancel_contribution(ctx)
    }

    pub fn create_unlock_request(
        ctx: Context<CreateUnlockRequest>,
        amount_requested: u64,
    ) -> Result<()> {
        instructions::create_unlock_request(ctx, amount_requested)
    }

    pub fn create_transaction(ctx: Context<CreateTransaction>, selling_price: u64) -> Result<()> {
        instructions::create_transaction(ctx, selling_price)
    }

    pub fn complete_transaction(ctx: Context<CompleteTransaction>) -> Result<()> {
        instructions::complete_transaction(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
