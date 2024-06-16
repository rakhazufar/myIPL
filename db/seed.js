const { prisma } = require("./prisma");
const { hashPassword } = require("../libs/bcrypt");
require("dotenv").config();

async function main() {
  const passwordString = process.env.PASSWORD_STRING_ADMIN;
  const hashedPassword = await hashPassword({ passwordString });

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

  const administrator = await prisma.admin.create({
    data: {
      nama: "dhayu",
      email: "dhayuserver@gmail.com",
      password: hashedPassword,
      nomor_telepon: "089639143290",
      id_role: 1,
    },
  });

  console.log({ adminsitrator, pengelolaCluster, administrator });
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
