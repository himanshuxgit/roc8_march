// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const GET = async (_request: any, { params }: any) => {
//   try {
//     console.log(params);
    
//     // await connectToDb();

//     // const prompt = await Prompt.findById(params.id).populate("creator");

//     if (!prompt) return new Response("Prompt not found!", { status: 404 });

//     return new Response(JSON.stringify("Hello Java"), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Failed to fetch all prompts", { status: 500 });
//   }
// };
// async function main() {
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
//   const allUsers = await prisma.user.findMany();
//   console.log("Hello World\n\n\n", allUsers);
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
