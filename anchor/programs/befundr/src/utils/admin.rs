use crate::constants::ADMIN_PUBKEYS;
use anchor_lang::prelude::Pubkey;

pub fn is_admin(pubkey: &Pubkey) -> bool {
    ADMIN_PUBKEYS.contains(&pubkey.to_string().as_str())
}
