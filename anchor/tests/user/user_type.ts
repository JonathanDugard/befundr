export type User = {
  owner?: string
  name?: string
  avatar_url?: string
  bio?: string
}

export type UserPda = {
  owner?: string
  name?: string
  avatar_url?: string
  bio?: string
  created_project_counter: number
}