use anchor_lang::prelude::*;
use crate::state::user::UserProfile;

pub fn create_user(ctx: Context<CreateUserProfile>, name: Option<String>, avatar_url: Option<String>, bio: Option<String>) -> Result<()> {
    let user_profile = &mut ctx.accounts.user;
    user_profile.wallet_pubkey = ctx.accounts.signer.key();
    user_profile.name = name;
    user_profile.avatar_url = avatar_url;
    user_profile.bio = bio;
    user_profile.created_project_counter = 0;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateUserProfile<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + UserProfile::INIT_SPACE,
        seeds = [b"user", signer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserProfile>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
