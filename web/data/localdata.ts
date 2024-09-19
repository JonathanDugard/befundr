//* CATEGORY
export const categories : string[] = ["All","Art","Tech","Design"]

//* REWARD
export const reward1 :Reward= {
    name:"Reward 1",
    imageUrl:"",
    description:"Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.",
    price:50,
    maxSupply:1000,
    currentSupply:243
}

//* PROJECT
export const project1 : Project= {
    id:"0",
    ownerId:"0",
    name:"First project",
    imageUrl:"",
    headline:"Project one headline, really cool",
    projectDescription:"Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.",
    goalAmount:50000,
    raisedAmount:12150,
    createdTime:new Date(2024,7,30),
    endTime:new Date(2024,8,30),
    status: "Fundraising", 
    contributionCounter:243,
    trustScore:75,
    rewards:[reward1,reward1,reward1]
}

export const projects : Project[] = [project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1]


