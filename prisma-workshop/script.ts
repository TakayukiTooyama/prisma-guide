import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Task1: すべての User レコードを返すクエリの作成
  // const users = await prisma.user.findMany();
  // console.log(users);
  // [
  //   { id: 1, email: "takayuki@gmail.com", name: "taka" },
  //   { id: 2, email: "akane@gmail.com", name: "akane" },
  //   { id: 3, email: "tooyama@gmail.com", name: "tooyama" },
  // ];

  // Task2: 新しい User レコード を作成するクエリの作成
  // const result = await prisma.user.create({
  //   data: {
  //     email: "alice@prisma.io",
  //   },
  // });
  // console.log(result);
  // { id: 4, email: 'alice@prisma.io', name: null }

  // Task3: 既存の User レコードを更新するクエリの作成
  const result = await prisma.user.update({
    where: {
      email: "alice@prisma.io",
    },
    data: {
      name: "Alice",
    },
  });
  console.log(result);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
