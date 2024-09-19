use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Reward {
    #[max_len(64)]
    pub name: String,

    #[max_len(256)]
    pub description: String,

    pub price: u64,
    pub max_supply: Option<u16>,
    pub current_supply: u32,
}
