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
  // const result = await prisma.user.update({
  //   where: {
  //     email: "alice@prisma.io",
  //   },
  //   data: {
  //     name: "Alice",
  //   },
  // });
  // console.log(result);

  // Task4: データベースに Post テーブルを追加する
  // const result = await prisma.post.create({
  //   data: {
  //     title: "Hello World",
  //   },
  // });
  // console.log(result);
  // {
  //   id: 1,
  //   title: 'Hello World',
  //   content: null,
  //   published: false,
  //   authorId: null
  // }

  // Task6: User レコードと Post レコードを接続するクエリの作成
  // const result = await prisma.post.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     author: {
  //       connect: { email: "alice@prisma.io" },
  //     },
  //   },
  // });
  // console.log(result);
  // {
  //   id: 1,
  //   title: 'Hello World',
  //   content: null,
  //   published: false,
  //   authorId: 4
  // }

  // Task7: 一意な値を持つ単一の User レコードを取得するクエリの作成
  // const result = await prisma.user.findUnique({
  //   where: {
  //     email: "alice@prisma.io",
  //   },
  // });
  // console.log(result);
  // { id: 4, email: 'alice@prisma.io', name: 'Alice' }

  // Task8: フィールドのサブセットのみを選択するクエリの作成
  // const result = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //   },
  // });
  // console.log(result);
  // [
  //   { id: 1, name: "taka" },
  //   { id: 2, name: "akane" },
  //   { id: 3, name: "tooyama" },
  //   { id: 4, name: "Alice" },
  // ];

  // Task9: リレーションを結果に含めるためのネストしたクエリの作成
  // const result = await prisma.user.findMany({
  //   where: { email: "alice@prisma.io" },
  //   include: { posts: true },
  // });
  // console.dir(result, { depth: null });
  // [
  //   {
  //     id: 4,
  //     email: "alice@prisma.io",
  //     name: "Alice",
  //     posts: [
  //       {
  //         id: 1,
  //         title: "Hello World",
  //         content: null,
  //         published: false,
  //         authorId: 4,
  //       },
  //     ],
  //   },
  // ];

  // Task10: 新しい User レコードと新しい Post レコードを作成する入れ子式の書き込みクエリを作成する
  // const result = await prisma.user.create({
  //   data: {
  //     email: "taka@prisma.io",
  //     name: "takamaru",
  //     posts: {
  //       create: {
  //         title: "test title 2",
  //         content: "test content 2",
  //       },
  //     },
  //   },
  // });
  // console.dir(result, { depth: null });
  // { id: 5, email: 'taka@prisma.io', name: 'takamaru' }

  // Task11: 名前が "A "で始まるユーザーをフィルタリングするクエリを作成する
  // const result = await prisma.user.findMany({
  //   where: {
  //     name: {
  //       startsWith: "A",
  //     },
  //   },
  // });
  // console.log(result);
  // 大文字と小文字の区別をしてくれない...
  // [
  //   { id: 2, email: "akane@gmail.com", name: "akane" },
  //   { id: 4, email: "alice@prisma.io", name: "Alice" },
  // ];

  // Task12: ページネーションクエリの作成;
  // 前回のcursorをstateに持ち、クリックされたら次のデータを取得などできる
  let myCursor = 0;
  const secondQueryResults = await prisma.user.findMany({
    take: 2,
    skip: 1,
    // cursor: {
    //   id: myCursor,
    // },
    orderBy: {
      id: "asc",
    },
  });
  const lastPostInResults = secondQueryResults[1];
  myCursor = lastPostInResults.id;
  console.log(myCursor);
  // 3
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
