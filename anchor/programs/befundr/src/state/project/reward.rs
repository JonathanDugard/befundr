use anchor_lang::prelude::*;

use crate::{
    constants::reward::{MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH},
    errors::RewardError,
};

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Reward {
    #[max_len(MAX_NAME_LENGTH)]
    pub name: String,

    #[max_len(MAX_DESCRIPTION_LENGTH)]
    pub description: String,

    pub price: u64,
    pub max_supply: Option<u16>,
    pub current_supply: u32,
}

impl Reward {
    pub fn validate(&self) -> Result<()> {
        // Validate name length
        require!(self.name.len() as u64 <= MAX_NAME_LENGTH, RewardError::NameTooLong);

        // Validate description length
        require!(
            self.description.len() as u64 <= MAX_DESCRIPTION_LENGTH,
            RewardError::DescriptionTooLong
        );

        // Validate price
        require!(self.price > 0, RewardError::PriceInvalid);

        // Validate current supply if max_supply is defined
        if let Some(max) = self.max_supply {
            require!(max > 0, RewardError::MaxSupplyInvalid);
            require!(self.current_supply <= max.into(), RewardError::CurrentSupplyInvalid);
        }

        Ok(())
    }
}