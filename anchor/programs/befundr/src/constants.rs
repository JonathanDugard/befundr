pub mod user {
    pub const MAX_NAME_LENGTH: u64 = 64;
    pub const MAX_AVATAR_URL_LENGTH: u64 = 128;
    pub const MAX_BIO_LENGTH: u64 = 256;
    pub const MAX_CITY_LENGTH: u64 = 100;
}

// Temporary admins keys const
// FOR LOCAL DEV PURPOSES ONLY
pub const ADMIN_PUBKEYS: &[&str] = &[
    "5djqaFNzTZtvfbpgQqyQ8NVNzn1DU1Fof9snJyKZM1oD",
    // Add more admin public keys as needed
];