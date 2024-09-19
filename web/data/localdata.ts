//* CATEGORY
export const categories : string[] = ["All","Art","Tech","Design"]

//* USER
export const user1 : User = {
    ownerAddress:"xxxx",
    name:"Albert HALL",
    city:"London",
    avatarUrl:"",
    bio:"Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.",
    createdProjectCounter:2
}

//* REWARD
export const reward1 :Reward= {
    name:"Reward 1",
    imageUrl:"",
    description:"Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.",
    price:50,
    maxSupply:1000,
    currentSupply:243
}

//* UPDATE
export const update1 : Update = {
    title:"Project update example",
    type:"information",
    createdAt: new Date(2024,8,2),
    description:"Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula."
}

//* PROJECT
export const project1 : Project= {
    id:"0",
    ownerId:"0",
    name:"First project",
    imageUrl:"",
    headline:"Project one headline, really cool",
    projectDescription:"Morbi congue congue metus. Aenean sed purus.  Nam pede magna, tristique nec, porta id, sollicitudin quis, sapien.  Vestibulum blandit. Suspendisse ut augue ac nibh ullamcorper  posuere. Integer euismod, neque at eleifend fringilla, augue elit  ornare dolor, vel tincidunt purus est id lacus. Vivamus lorem dui,  commodo quis, scelerisque eu, tincidunt non, magna. Cras sodales.  Quisque vestibulum pulvinar diam. Phasellus tincidunt, leo vitae  tristique facilisis, ipsum wisi interdum sem, dapibus semper nulla  velit vel lectus. Cras dapibus mauris et augue. Quisque cursus nulla  in libero. Suspendisse et lorem sit amet mauris malesuada mollis.  Nullam id justo. Maecenas venenatis. Donec lacus arcu, egestas ac,  fermentum consectetuer, tempus eu, metus. Proin sodales, sem in  pretium fermentum, arcu sapien commodo mauris, venenatis consequat  augue urna in wisi. Quisque sapien nunc, varius eget, condimentum  quis, lacinia in, est. Fusce facilisis. Praesent nec ipsum.\n\n Integer interdum varius diam. Nam aliquam  velit a pede. Vivamus dictum nulla et wisi. Vestibulum a massa.  Donec vulputate nibh vitae risus dictum varius. Nunc suscipit, nunc  nec facilisis convallis, lacus ligula bibendum nulla, ac  sollicitudin sapien nisl fermentum velit. Lorem ipsum dolor sit  amet, consectetuer adipiscing elit. Nullam commodo dui ut augue  molestie scelerisque. Sed aliquet rhoncus tortor. Fusce laoreet,  turpis a facilisis tristique, leo mauris accumsan tellus, vitae  ornare lacus pede sit amet purus. Sed dignissim velit vitae ligula.  Sed sit amet diam sit amet arcu luctus ullamcorper.\n\n Nulla venenatis lorem id arcu. Morbi cursus urna  a ipsum. Donec porttitor. Integer eleifend, est non mattis  malesuada, mi nulla convallis mi, et auctor lectus sapien ut purus.  Aliquam nulla augue, pharetra sit amet, faucibus semper, molestie  vel, nibh. Pellentesque vestibulum magna et mi. Sed fringilla dolor  vel tellus. Nunc libero nunc, venenatis eget, convallis hendrerit,  iaculis elementum, mi. Nullam aliquam, felis et accumsan vehicula,  magna justo vehicula diam, eu condimentum nisl felis et nunc.  Quisque volutpat mauris a velit. Pellentesque massa. Integer at  lorem. Nam metus erat, lacinia id, convallis ut, pulvinar non, wisi.   Cras iaculis mauris ut neque. Cras sodales, sem vitae imperdiet  consequat, pede purus sollicitudin urna, ac aliquam metus orci in  leo. Ut molestie ultrices mauris. Vivamus vitae sem. Aliquam erat  volutpat. Praesent commodo, nisl ac dapibus aliquet, tortor orci  sodales lorem, non ornare nulla lorem quis nisl.",
    goalAmount:50000,
    raisedAmount:12150,
    createdTime:new Date(2024,7,30),
    endTime:new Date(2024,8,30),
    status: "Fundraising", 
    contributionCounter:243,
    trustScore:75,
    rewards:[reward1,reward1,reward1],
    safetyDeposit:5000,
    updates:[update1,update1,update1]
}

export const projects : Project[] = [project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1,project1]


