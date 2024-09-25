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

#[error_code]
pub enum CreateProjectError {
    #[msg("Project name is too short (min 5 characters).")]
    NameTooShort,
    #[msg("Project name is too long (max 64 characters).")]
    NameTooLong,
    #[msg("Image URL is too long (max 128 characters).")]
    ImageUrlTooLong,
    #[msg("Description is too short (min 10 characters).")]
    DescriptionTooShort,
    #[msg("Description is too long (max 500 characters).")]
    DescriptionTooLong,
    #[msg("Goal amount is too low (min $1).")]
    GoalAmountBelowLimit,
    #[msg("End time is in the past.")]
    EndTimeInPast,
    #[msg("End time beyond the limit.")]
    ExceedingEndTime,
    #[msg("Not enough rewards (min 1).")]
    NotEnoughRewards,
    #[msg("Too many rewards (max 10).")]
    TooManyRewards,
}

#[error_code]
pub enum RewardError {
    #[msg("Name cannot exceed 64 characters.")]
    NameTooLong,
    #[msg("Description cannot exceed 100 characters.")]
    DescriptionTooLong,
    #[msg("Price must be greater than 0.")]
    PriceInvalid,
    #[msg("Current supply must be greater than 0.")]
    CurrentSupplyInvalid,
    #[msg("Max supply must be greater than or equal to current supply.")]
    MaxSupplyInvalid,
}

#[error_code]
pub enum ContributionError {
    #[msg("Project fundraising has ended.")]
    ProjectNotFundraising,
    #[msg("Signer must be the user.")]
    SignerNotUser,
    #[msg("Reward does not exist.")]
    RewardError,
    #[msg("Reward already reserved.")]
    RewardAlreadyReserved,
    #[msg("Contribution amount is insufficient for the selected reward.")]
    RewardPriceError,
    #[msg("Unauthorized action.")]
    Unauthorized,
}
