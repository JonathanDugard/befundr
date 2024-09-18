use anchor_lang::prelude::*;
use crate::state::User;
use crate::utils::is_admin;
use crate::errors::UserDeleteError;

pub fn delete_user(ctx: Context<DeleteUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let authority = &ctx.accounts.authority;

    // Check if the authority is an admin
    require!(is_admin(authority.key), UserDeleteError::Unauthorized);

    // Check if the user has any associated projects or contributions
    require!(user.created_project_counter == 0, UserDeleteError::UserHasActivity);
    // TODO: Check if the user has any contributions

    // Checks done, close the user account
    user.close(ctx.accounts.authority.to_account_info())?;
    Ok(())
}

#[derive(Accounts)]
pub struct DeleteUser<'info> {
    #[account(mut, close = authority)]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}