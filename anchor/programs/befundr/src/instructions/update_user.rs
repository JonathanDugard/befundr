use crate::state::user::User;
use anchor_lang::prelude::*;

pub fn update_user(
    ctx: Context<UpdateUser>,
    name: Option<String>,
    avatar_url: Option<String>,
    bio: Option<String>,
) -> Result<()> {
    let user = &mut ctx.accounts.user;

    update_field(&mut user.name, name);
    update_field(&mut user.avatar_url, avatar_url);
    update_field(&mut user.bio, bio);

    Ok(())
}

fn update_field(field: &mut Option<String>, new_value: Option<String>) {
    if let Some(value) = new_value {
        if value.is_empty() {
            *field = None;
        } else {
            *field = Some(value);
        }
    }
}

#[derive(Accounts)]
pub struct UpdateUser<'info> {
    #[account(
        mut,
        seeds = [b"user", owner.key().as_ref()],
        bump,
        has_one = owner
    )]
    pub user: Account<'info, User>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}
