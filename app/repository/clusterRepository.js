class ClusterRepository {
  create = async ({ prisma, reqBody }) => {
    try {
      const { id_perumahan, nama, id_pengelola } = reqBody;
      const newCluster = await prisma.cluster.create({
        data: {
          id_perumahan,
          nama,
          id_pengelola,
        },
      });

      return newCluster;
    } catch (error) {
      console.error("Error Create Cluster:", error);
      throw new Error("Failed to create perumahan");
    }
  };
}

module.exports = new ClusterRepository();
