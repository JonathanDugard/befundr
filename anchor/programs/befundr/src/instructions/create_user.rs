use crate::state::user::User;
use anchor_lang::prelude::*;

pub fn create_user(
    ctx: Context<CreateUser>,
    name: Option<String>,
    avatar_url: Option<String>,
    bio: Option<String>,
    city: Option<String>,
) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.owner = ctx.accounts.signer.key();
    user.name = name;
    user.avatar_url = avatar_url;
    user.bio = bio;
    user.city = city;
    user.created_project_counter = 0;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + User::INIT_SPACE,
        seeds = [b"user", signer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
