// Project type used by datasets and tests files

import { ProjectStatus } from "./project_status"
import { Reward } from "./reward_type"

// Some attributes are optional because they are set by the program at creation
export type Project = {
  owner?: string
  user?: string
  name: string
  image_url: string
  project_description: string
  goal_amount: number
  raised_amount?: number
  created_time: number
  end_time: number
  status?: ProjectStatus
  contribution_counter?: number
  rewards: Reward[]
}