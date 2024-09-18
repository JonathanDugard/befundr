/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/befundr.json`.
 */
export type Befundr = {
  "address": "29rtbJLEFXoCc6sTzp2jAHhXgrZTEb6EaMnUTDP14VFv",
  "metadata": {
    "name": "befundr",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
          "name": "projectDescription",
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
        }
      ]
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
        }
      ]
    }
  ],
  "accounts": [
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
    }
  ],
  "types": [
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
            "name": "projectDescription",
            "type": "string"
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
                "name": "status"
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
            "name": "rewardDescription",
            "type": "string"
          },
          {
            "name": "rewardAmount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "status",
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
            "name": "createdProjectCounter",
            "type": "u16"
          }
        ]
      }
    }
  ]
};
