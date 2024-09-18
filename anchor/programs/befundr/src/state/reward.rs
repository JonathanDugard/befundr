use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Reward {
    #[max_len(64)]
    pub name: String,

    #[max_len(256)]
    pub reward_description: String,

    pub reward_amount: u32,
}
