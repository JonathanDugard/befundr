import { BN } from "@coral-xyz/anchor"

export type Reward = {
  name: string
  description: string
  price: BN
  maxSupply: BN
  currentSupply: BN
}