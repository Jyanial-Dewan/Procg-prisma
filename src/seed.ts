import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    console.log("seeding ....")
};

main()
    .catch((e) => console.log(e))
    .finally(async () => {
        await prisma.$disconnect()
    })