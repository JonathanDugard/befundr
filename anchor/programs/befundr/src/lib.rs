use anchor_lang::prelude::*;

declare_id!("96wTDUBBReTTxkHzsf3ehi73qqEX97n4JWoV8mcH7gNp");

#[program]
pub mod befundr {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
