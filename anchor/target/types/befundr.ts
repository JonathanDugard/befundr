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
    }
  ],
  "accounts": [
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
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "walletPubkey",
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
