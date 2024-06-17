const ClusterRepository = require("../repository/clusterRepository");

class ClusterService {
  async create({ prisma, reqBody }) {
    try {
      const newCluster = await ClusterRepository.create({ prisma, reqBody });
      return newCluster;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Service operation failed");
    }
  }
}

module.exports = new ClusterService();
