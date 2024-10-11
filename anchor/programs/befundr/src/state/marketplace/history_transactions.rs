use anchor_lang::prelude::*;

use crate::constants::marketplace::MAX_HISTORY_TRANSACTIONS_NUMBER;

use super::HistoryTransaction;

#[account]
#[derive(InitSpace)]
pub struct HistoryTransactions {
    #[max_len(MAX_HISTORY_TRANSACTIONS_NUMBER)]
    pub transactions: Vec<HistoryTransaction>,
}

impl HistoryTransaction {}
