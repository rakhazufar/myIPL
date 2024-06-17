const ClusterService = require("../services/clusterServices");
const { ApplicationControllers } = require("./applicationControllers");

class ClusterControllers extends ApplicationControllers {
  create = async (req, res) => {
    try {
      const reqBody = req.body;
      const newCluster = await ClusterService.create({
        prisma: req.prisma,
        reqBody,
      });

      res.status(201).json({ success: true, data: newCluster });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = { ClusterControllers };
