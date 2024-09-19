use anchor_lang::prelude::*;

#[error_code]
pub enum DeleteUserError {
    #[msg("Unauthorized: Only the admin can delete users.")]
    Unauthorized,
    #[msg("User has associated projects or contributions.")]
    UserHasActivity,
    #[msg("Wrong owner account.")]
    WrongOwnerAccount,
}