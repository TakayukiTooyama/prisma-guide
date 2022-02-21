import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Task1: すべての User レコードを返すクエリの作成
  const users = await prisma.user.findMany();
  console.log(users);
  // [
  //   { id: 1, email: "takayuki@gmail.com", name: "taka" },
  //   { id: 2, email: "akane@gmail.com", name: "akane" },
  //   { id: 3, email: "tooyama@gmail.com", name: "tooyama" },
  // ];
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
