import { BN } from "@coral-xyz/anchor"

export type Reward = {
  metadataUri: string
  price: BN
  maxSupply: BN
  currentSupply: BN
}