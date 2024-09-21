pub mod user {
    pub const MAX_NAME_LENGTH: usize = 64;
    pub const MAX_AVATAR_URL_LENGTH: usize = 128;
    pub const MAX_BIO_LENGTH: usize = 256;
    pub const MAX_CITY_LENGTH: usize = 100;
}

// Temporary admins keys const
// FOR LOCAL DEV PURPOSES ONLY
pub const ADMIN_PUBKEYS: &[&str] = &[
    "5djqaFNzTZtvfbpgQqyQ8NVNzn1DU1Fof9snJyKZM1oD",
    // Add more admin public keys as needed
];