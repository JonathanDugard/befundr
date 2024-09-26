use anchor_lang::prelude::*;

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize)]
pub enum ProjectCategory {
    Technology,
    Art,
    Education,
    Health,
    Environment,
    SocialImpact,
    Entertainment,
    Science,
    Finance,
    Sports,
}
