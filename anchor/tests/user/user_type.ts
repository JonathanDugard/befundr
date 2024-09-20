import { BN } from "@coral-xyz/anchor"

export type User = {
  owner?: string
  name?: string
  avatar_url?: string
  bio?: string
  city?: string
}

export type UserPda = {
  owner?: string
  name?: string
  avatar_url?: string
  bio?: string
  city?: string
  created_project_counter: BN
}