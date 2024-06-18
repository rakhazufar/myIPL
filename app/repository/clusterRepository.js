class ClusterRepository {
  create = async ({ prisma, reqBody }) => {
    try {
      const { perumahan_id, nama, pengelola_id } = reqBody;
      const newCluster = await prisma.cluster.create({
        data: {
          perumahan_id,
          nama,
          pengelola_id,
        },
      });

      return newCluster;
    } catch (error) {
      console.error("Error Create Cluster:", error);
      throw new Error("Failed to create perumahan");
    }
  };

  get = async ({ prisma }) => {
    try {
      const clusters = await prisma.cluster.findMany();
      return clusters;
    } catch (error) {
      console.error("Error Get Cluster:", error);
      throw new Error("Failed to Get Cluster");
    }
  };
}

module.exports = new ClusterRepository();
