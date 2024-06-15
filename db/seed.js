const { prisma } = require("./prisma");

async function main() {
  const adminsitrator = await prisma.role.create({
    data: {
      nama: "Administrator",
    },
  });

  const pengelolaCluster = await prisma.role.create({
    data: {
      nama: "Pengelola Cluster",
    },
  });

  console.log({ adminsitrator, pengelolaCluster });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
