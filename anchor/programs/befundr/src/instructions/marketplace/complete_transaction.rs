use crate::{
    errors::{AtaError, MarketplaceError},
    state::{
        user::User, Contribution, HistoryTransaction, HistoryTransactions, SaleTransaction,
        UserContributions,
    },
    utils::transfer_spl_token,
};
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

pub fn complete_transaction(ctx: Context<CompleteTransaction>) -> Result<()> {
    let buyer = &mut ctx.accounts.buyer;
    let buyer_ata = &mut ctx.accounts.buyer_ata;
    let buyer_user = &mut ctx.accounts.buyer_user;
    let buyer_user_contributions = &mut ctx.accounts.buyer_user_contributions;
    let seller = &mut ctx.accounts.seller;
    let seller_ata = &mut ctx.accounts.seller_ata;
    let seller_user = &mut ctx.accounts.seller_user;
    let seller_user_contributions = &mut ctx.accounts.seller_user_contributions;
    let contribution = &mut ctx.accounts.contribution;
    let history_transactions = &mut ctx.accounts.history_transactions;
    let sale_transaction = &mut ctx.accounts.sale_transaction;

    require!(buyer.key() == buyer_user.owner, MarketplaceError::BuyerNotUser);
    require!(seller.key() == seller_user.owner, MarketplaceError::SellerNotUser);
    require!(
        sale_transaction.seller == seller_user.key(),
        MarketplaceError::SellerNotContributionOwner
    );

    require!(buyer_ata.owner == buyer.key(), AtaError::WrongAtaOwner);
    require!(seller_ata.owner == seller.key(), AtaError::WrongAtaOwner);

    let now: i64 = Clock::get()?.unix_timestamp;

    contribution.current_owner = buyer_user.key();
    seller_user_contributions.remove_contribution(contribution.key())?;
    buyer_user_contributions
        .contributions
        .push(contribution.key());

    //Move transaction in history
    history_transactions
        .transactions
        .push(HistoryTransaction::new(
            seller.key(),
            buyer.key(),
            contribution.key(),
            sale_transaction.selling_price,
            sale_transaction.creation_timestamp,
            now,
        ));

    transfer_spl_token(
        &ctx.accounts.token_program,
        &buyer_ata,
        &seller_ata,
        &buyer,
        sale_transaction.selling_price,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct CompleteTransaction<'info> {
    #[account(
        init_if_needed,
        payer = buyer,
        space = 8 + HistoryTransactions::INIT_SPACE,
        seeds = [b"history_transactions", contribution.key().as_ref()],
        bump
    )]
    pub history_transactions: Account<'info, HistoryTransactions>,

    #[account(mut, close = seller)]
    pub sale_transaction: Account<'info, SaleTransaction>,

    #[account(
        init_if_needed,
        payer = buyer,
        space = 8 + UserContributions::INIT_SPACE,
        seeds = [b"user_contributions", buyer_user.key().as_ref()],
        bump
    )]
    pub buyer_user_contributions: Account<'info, UserContributions>,

    #[account(mut)]
    pub seller_user_contributions: Account<'info, UserContributions>,

    #[account()]
    pub buyer_user: Account<'info, User>,

    #[account()]
    pub seller_user: Account<'info, User>,

    #[account(mut)]
    pub contribution: Account<'info, Contribution>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    pub buyer_ata: Account<'info, TokenAccount>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub seller: AccountInfo<'info>,

    #[account(mut)]
    pub seller_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
