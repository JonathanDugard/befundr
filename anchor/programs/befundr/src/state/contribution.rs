use anchor_lang::prelude::*;

#[derive(Copy, Clone, InitSpace, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum ContributionStatus {
    Active,
    Cancelled,
}

#[account]
#[derive(InitSpace)]
pub struct Contribution {
    //Should contain Signer Pubkey
    pub initial_owner: Pubkey, // User PDA pubkey
    pub current_owner: Pubkey, // User PDA pubkey
    pub project: Pubkey,
    pub amount: u64,
    pub reward_id: Option<u64>,
    pub creation_timestamp: i64,
    pub is_for_sale: bool,
    pub selling_price: Option<u64>,
    status: ContributionStatus,
}

impl Default for Contribution {
    fn default() -> Self {
        Self {
            initial_owner: Pubkey::default(),
            current_owner: Pubkey::default(),
            project: Pubkey::default(),
            amount: 0,
            reward_id: None,
            creation_timestamp: 0,
            is_for_sale: false,
            selling_price: None,
            status: ContributionStatus::Active,
        }
    }
}

impl Contribution {
    pub fn get_status(&self) -> ContributionStatus {
        self.status
    }

    pub fn is_active(&self) -> bool {
        self.status == ContributionStatus::Active
    }

    pub fn set_active(&mut self) {
        self.status = ContributionStatus::Active;
    }

    pub fn set_cancelled(&mut self) {
        self.status = ContributionStatus::Cancelled;
    }
}
