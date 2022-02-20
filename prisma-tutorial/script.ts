import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // postsから返された各Userオブジェクトにリレーションを含めます
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });

  // Postに含まれるすべてのレコードを"Hello"でフィルタリング
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [{ title: { contains: "Hello" } }],
    },
  });

  // 新しいレコードを作成
  const user = await prisma.user.create({
    data: {
      name: "Tooyama",
      email: "taka@gmail.com",
      posts: {
        create: { title: "dummy title", content: "dummy content" },
      },
    },
  });

  // 既存のレコードを更新
  const post = await prisma.post.update({
    where: { id: 3 },
    data: { published: true },
  });

  console.dir(post);
  console.dir(allUsers, { depth: null });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
