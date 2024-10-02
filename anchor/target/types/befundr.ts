/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/befundr.json`.
 */
export type Befundr = {
  "address": "GwhXp6uzcsDPb8Git18t1pKAqE7zb9Jmviay6ffBdXfk",
  "metadata": {
    "name": "befundr",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addContribution",
      "discriminator": [
        115,
        15,
        193,
        201,
        25,
        254,
        227,
        124
      ],
      "accounts": [
        {
          "name": "project",
          "writable": true
        },
        {
          "name": "projectContributions",
          "writable": true
        },
        {
          "name": "user"
        },
        {
          "name": "userContributions",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "contribution",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "rewardId",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "cancelContribution",
      "discriminator": [
        184,
        238,
        88,
        63,
        152,
        103,
        17,
        123
      ],
      "accounts": [
        {
          "name": "project",
          "writable": true
        },
        {
          "name": "user"
        },
        {
          "name": "contribution",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createProject",
      "discriminator": [
        148,
        219,
        181,
        42,
        221,
        114,
        145,
        190
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "project",
          "writable": true
        },
        {
          "name": "projectContributions",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  105,
                  111,
                  110,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "project"
              }
            ]
          }
        },
        {
          "name": "unlockRequests",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  117,
                  110,
                  108,
                  111,
                  99,
                  107,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "project"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "goalAmount",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "rewards",
          "type": {
            "vec": {
              "defined": {
                "name": "reward"
              }
            }
          }
        },
        {
          "name": "safetyDeposit",
          "type": "u64"
        },
        {
          "name": "xAccountUrl",
          "type": "string"
        },
        {
          "name": "category",
          "type": {
            "defined": {
              "name": "projectCategory"
            }
          }
        }
      ]
    },
    {
      "name": "createUnlockRequest",
      "discriminator": [
        134,
        176,
        114,
        229,
        42,
        195,
        78,
        214
      ],
      "accounts": [
        {
          "name": "user",
          "relations": [
            "project"
          ]
        },
        {
          "name": "unlockRequests",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  117,
                  110,
                  108,
                  111,
                  99,
                  107,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "project"
              }
            ]
          }
        },
        {
          "name": "newUnlockRequest",
          "writable": true
        },
        {
          "name": "currentUnlockRequest",
          "optional": true
        },
        {
          "name": "project",
          "relations": [
            "unlockRequests",
            "currentUnlockRequest"
          ]
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "user"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountRequested",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createUser",
      "discriminator": [
        108,
        227,
        130,
        130,
        252,
        109,
        75,
        218
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "avatarUrl",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "bio",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "city",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "deleteUser",
      "discriminator": [
        186,
        85,
        17,
        249,
        219,
        231,
        98,
        251
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateUser",
      "discriminator": [
        9,
        2,
        160,
        169,
        118,
        12,
        207,
        84
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "user"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "avatarUrl",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "bio",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "city",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "contribution",
      "discriminator": [
        182,
        187,
        14,
        111,
        72,
        167,
        242,
        212
      ]
    },
    {
      "name": "project",
      "discriminator": [
        205,
        168,
        189,
        202,
        181,
        247,
        142,
        19
      ]
    },
    {
      "name": "projectContributions",
      "discriminator": [
        83,
        72,
        156,
        71,
        194,
        187,
        160,
        150
      ]
    },
    {
      "name": "unlockRequest",
      "discriminator": [
        35,
        145,
        59,
        13,
        207,
        180,
        49,
        24
      ]
    },
    {
      "name": "unlockRequests",
      "discriminator": [
        225,
        75,
        162,
        136,
        240,
        196,
        185,
        219
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    },
    {
      "name": "userContributions",
      "discriminator": [
        215,
        150,
        11,
        243,
        145,
        49,
        43,
        66
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooShort",
      "msg": "Project name is too short (min 5 characters)."
    },
    {
      "code": 6001,
      "name": "nameTooLong",
      "msg": "Project name is too long (max 64 characters)."
    },
    {
      "code": 6002,
      "name": "imageUrlTooLong",
      "msg": "Image URL is too long (max 256 characters)."
    },
    {
      "code": 6003,
      "name": "urlTooLong",
      "msg": "URL is too long (max 128 characters)."
    },
    {
      "code": 6004,
      "name": "descriptionTooShort",
      "msg": "Description is too short (min 10 characters)."
    },
    {
      "code": 6005,
      "name": "descriptionTooLong",
      "msg": "Description is too long (max 500 characters)."
    },
    {
      "code": 6006,
      "name": "goalAmountBelowLimit",
      "msg": "Goal amount is too low (min $1)."
    },
    {
      "code": 6007,
      "name": "endTimeInPast",
      "msg": "End time is in the past."
    },
    {
      "code": 6008,
      "name": "exceedingEndTime",
      "msg": "End time beyond the limit."
    },
    {
      "code": 6009,
      "name": "notEnoughRewards",
      "msg": "Not enough rewards (min 1)."
    },
    {
      "code": 6010,
      "name": "tooManyRewards",
      "msg": "Too many rewards (max 10)."
    }
  ],
  "types": [
    {
      "name": "contribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialOwner",
            "type": "pubkey"
          },
          {
            "name": "currentOwner",
            "type": "pubkey"
          },
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "rewardId",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "creationTimestamp",
            "type": "i64"
          },
          {
            "name": "isClaimed",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "contributionStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "contributionStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "active"
          },
          {
            "name": "cancelled"
          }
        ]
      }
    },
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "xAccountUrl",
            "type": "string"
          },
          {
            "name": "category",
            "type": {
              "defined": {
                "name": "projectCategory"
              }
            }
          },
          {
            "name": "goalAmount",
            "type": "u64"
          },
          {
            "name": "raisedAmount",
            "type": "u64"
          },
          {
            "name": "createdTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "projectStatus"
              }
            }
          },
          {
            "name": "contributionCounter",
            "type": "u16"
          },
          {
            "name": "rewards",
            "type": {
              "vec": {
                "defined": {
                  "name": "reward"
                }
              }
            }
          },
          {
            "name": "feed",
            "type": "pubkey"
          },
          {
            "name": "safetyDeposit",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "projectCategory",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "technology"
          },
          {
            "name": "art"
          },
          {
            "name": "education"
          },
          {
            "name": "health"
          },
          {
            "name": "environment"
          },
          {
            "name": "socialImpact"
          },
          {
            "name": "entertainment"
          },
          {
            "name": "science"
          },
          {
            "name": "finance"
          },
          {
            "name": "sports"
          }
        ]
      }
    },
    {
      "name": "projectContributions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "contributions",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "projectStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "draft"
          },
          {
            "name": "fundraising"
          },
          {
            "name": "realising"
          },
          {
            "name": "completed"
          },
          {
            "name": "abandoned"
          },
          {
            "name": "suspended"
          }
        ]
      }
    },
    {
      "name": "reward",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "maxSupply",
            "type": {
              "option": "u16"
            }
          },
          {
            "name": "currentSupply",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "unlockRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "amountRequested",
            "type": "u64"
          },
          {
            "name": "votesAgainst",
            "type": "u64"
          },
          {
            "name": "createdTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "unlockTime",
            "type": "i64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "unlockStatus"
              }
            }
          },
          {
            "name": "votes",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "unlockRequests",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "requestCounter",
            "type": "u16"
          },
          {
            "name": "unlockedAmount",
            "type": "u64"
          },
          {
            "name": "requests",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "unlockStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "approved"
          },
          {
            "name": "rejected"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "avatarUrl",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "bio",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "city",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "createdProjectCounter",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "userContributions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributions",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    }
  ]
};
