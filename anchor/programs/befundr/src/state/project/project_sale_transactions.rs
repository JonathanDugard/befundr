use anchor_lang::prelude::*;

use crate::{
    constants::project_sale_transactions::MAX_SALE_TRANSACTIONS_NUMBER,
    errors::ProjectSaleTransactionError,
};

#[account]
#[derive(InitSpace)]
pub struct ProjectSaleTransactions {
    pub project: Pubkey,

    #[max_len(MAX_SALE_TRANSACTIONS_NUMBER)]
    pub sale_transactions: Vec<Pubkey>,
}

impl ProjectSaleTransactions {
    pub fn remove_sale_transaction(&mut self, pubkey: Pubkey) -> Result<()> {
        if let Some(index) = self.sale_transactions.iter().position(|&x| x == pubkey) {
            self.sale_transactions.remove(index);
            Ok(())
        } else {
            Err(ProjectSaleTransactionError::SaleTransactionNotFound.into())
        }
    }
}
