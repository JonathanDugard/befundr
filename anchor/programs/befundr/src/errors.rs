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
    #[msg("Image URL is too long (max 256 characters).")]
    ImageUrlTooLong,
    #[msg("URL is too long (max 128 characters).")]
    UrlTooLong,
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
    #[msg("Reward maximum supply reached.")]
    RewardSupplyReach,
    #[msg("Supply is empty.")]
    RewardSupplyEmpty,
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

#[error_code]
pub enum TransferError {
    #[msg("Funds transfer failed.")]
    TransferFailed,
}

#[error_code]
pub enum CreateUnlockRequestError {
    #[msg("Requested amount to unlock is too high")]
    RequestedAmountTooHigh,
    #[msg("Insufficient remaining funds")]
    NotEnoughFunds,
    #[msg("The project is not in realization")]
    WrongProjectStatus,
    #[msg("There is already a vote ongoing")]
    UnlockVoteAlreadyOngoing,
    #[msg("Request cooldown ongoing")]
    WaitBeforeNewRequest,
}

#[error_code]
pub enum MarketplaceError {
    #[msg("Signer is not the contribution owner")]
    NotContributionOwner,
    #[msg("The reward has been already claimed")]
    RewardAlreadyClaimed,
    #[msg("No reward associated to this contribution")]
    NoReward,
    #[msg("The contribution is not active")]
    ContributionNotActive,
    #[msg("Incorrect selling price")]
    IncorrectSellingPrice,
}
