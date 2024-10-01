use anchor_lang::prelude::*;
// use anchor_spl::mint::USDC as mintUSDC;
use crate::errors::TransferError;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};

pub struct SplTransferBuilder<'info> {
    token_program: Program<'info, Token>,
    authority: Option<Signer<'info>>,
    from_ata: Option<Account<'info, TokenAccount>>,
    to_ata: Option<Account<'info, TokenAccount>>,
    amount: Option<u64>,
}

// Usage example
// SplTransferBuilder::new(token_program)
//     .send(100)
//     .from(from_ata)
//     .to(to_ata)
//     .signed_by(payer)?;
impl<'info> SplTransferBuilder<'info> {
    pub fn new(token_program: Program<'info, Token>) -> Self {
        Self {
            token_program: token_program,
            authority: None,
            from_ata: None,
            to_ata: None,
            amount: None,
        }
    }

    pub fn send(mut self, amount: u64) -> Self {
        self.amount = Some(amount);
        self
    }

    pub fn from(mut self, from_ata: Account<'info, TokenAccount>) -> Self {
        self.from_ata = Some(from_ata);
        self
    }

    pub fn to(mut self, to_ata: Account<'info, TokenAccount>) -> Self {
        self.to_ata = Some(to_ata);
        self
    }

    pub fn signed_by(mut self, authority: Signer<'info>) -> Result<()> {
        self.authority = Some(authority);
        self.execute()
    }

    fn execute(self) -> Result<()> {
        let cpi_accounts = SplTransfer {
            from: self.from_ata.unwrap().to_account_info().clone(),
            to: self.to_ata.unwrap().to_account_info().clone(),
            authority: self.authority.unwrap().to_account_info().clone(),
        };
        let cpi_program = self.token_program.to_account_info();

        match token::transfer(CpiContext::new(cpi_program, cpi_accounts), self.amount.unwrap()) {
            Ok(_) => Ok(()),
            Err(_) => Err(TransferError::TransferFailed.into()),
        }
    }
}
