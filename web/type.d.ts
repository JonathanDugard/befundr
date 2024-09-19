type Project = {
    id:string
    ownerId:string
    name:string
    imageUrl:string
    headline:string
    projectDescription:string
    goalAmount:number
    raisedAmount:number
    createdTime:Date
    endTime:Date
    status:"Draft" | "Fundraising" | "Realising" | "Completed" | "Abandoned" | "Suspended"
    contributionCounter:number
    trustScore:number //between 0 to 100
    rewards:any
    safetyDeposit:number
    updates: Update[]
}

type Reward = {
    name:string
    imageUrl:string
    description:string
    price:number
    maxSupply?:number
    currentSupply:number
}

type User = {
    ownerAddress : string
    name:string
    city?:string
    avatarUrl:string
    bio:string
    createdProjectCounter:number
}

type Update = {
    title:string
    type: "information" | "funds unlock" | "milestone"
    createdAt: Date
    description:string
}

