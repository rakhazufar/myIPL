const { prisma } = require("../db/prisma");

const prismaMiddleware = (req, res, next) => {
  req.prisma = prisma;
  res.on("finish", async () => {
    console.log("Disconnecting Prisma Client");
    await prisma.$disconnect();
  });
  next();
};

module.exports = { prismaMiddleware };
