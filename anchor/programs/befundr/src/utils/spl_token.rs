use anchor_lang::prelude::*;
// use anchor_spl::mint::USDC as mintUSDC;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

pub fn transfer_spl_token<'info>(
    token_program: &Program<'info, Token>,
    from_ata: &Account<'info, TokenAccount>,
    to_ata: &Account<'info, TokenAccount>,
    authority: &Signer<'info>,
    amount: u64,
) -> Result<()> {
    let cpi_accounts = Transfer {
        from: from_ata.to_account_info(),
        to: to_ata.to_account_info(),
        authority: authority.to_account_info(),
    };
    let cpi_program = token_program.to_account_info();

    token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

    Ok(())
}
