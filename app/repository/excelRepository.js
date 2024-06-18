class ExcelRepository {
  uploadExcel = async ({ prisma, users }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const x = await Promise.all(
          users.map((user) =>
            tx.user.create({
              data: user,
            })
          )
        );

        return x;
      });

      return result;
    } catch (error) {
      if (error.code === "P2002") {
        console.log(
          "Unique constraint failed on the fields:",
          error.meta.target
        );
        throw new Error(
          `Unique constraint failed on the fields: ${error.meta.target}`
        );
      } else {
        console.log("Error create users:", error.message);
        throw new Error("Error create users:", error.message);
      }
    }
  };
}

module.exports = new ExcelRepository();
