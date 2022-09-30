import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [

    {
        "firstname": "Grace",
        "lastname": "Lynch",
        "email": "Claud50@gmail.com",
        "hash_password": "$2b$10$0gOWWYjgbFVn1NvXTrOtFuzB5j47MNiMApU6qtLwvZI6LpW2PfBw6" // Life is awesome 
    },
    {
        "firstname": "Kehinde",
        "lastname": "Fasunle",
        "email": "kfasunle@gmail.com",
        "hash_password": "$2b$10$RFacPRS/ametl06MOBWtdeOHXEiLGJ4iUPfHvMB6w9mwBBoPeyTG6" // See my face ✔
    },

]

const main = async () => {
    
    console.log( "Seeding Started...");

    for ( const u of users ) {
        const user = await prisma.user.create( { data: u } );
        console.log( "Created user with id: ", user.id );
    }

    console.log( "Seeding completed...");
}

main()
    .then( async () => await prisma.$disconnect() )
    .catch( async () => await prisma.$disconnect() );