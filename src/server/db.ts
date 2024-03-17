import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: "postgresql://r8_owner:IDLR2rNg8eKP@ep-bitter-silence-a1ac491f.ap-southeast-1.aws.neon.tech/r8?sslmode=require"
      }
    }
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

// if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// import { faker } from '@faker-js/faker';
// // import { category } from '@prisma/client';

// async function main() {
//   // ... you will write your Prisma Client queries here

//   // await prisma.user.create({
//   //   data: {
//   //     name: "Alice",
//   //     email: "alice@prisma.io",
//   //     password: "123456",
//   //     // posts: {
//   //     //   create: { title: "Hello World" },
//   //     // },
//   //     // profile: {
//   //     //   create: { bio: "I like turtles" },
//   //     // },
//   //   },
//   // });
//   // const allUsers = await prisma.user.findMany();
//   // const allUsers = faker.commerce.department();
//   // console.log(faker.science.chemicalElement().name);
//   // for (let i = 0; i < 5; i++) {
//   //   try {
//   //     await prisma.category.create({
//   //       data: {
//   //         name: faker.science.chemicalElement().name,
//   //       },
//   //     });
      
//   //   } catch (error) {
//   //     console.log("error", error);
      
//   //   }
//   // }
//   console.log(1);

// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
