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
      console.error("Error creating user:", error);
      throw new Error(`Failed to create users: ${error}`);
    }
  };
}

module.exports = new ExcelRepository();
