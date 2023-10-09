const OverallStat = require("../models/OverallStat");

async function getSales(req, res) {
  try {
    const overallStats = await OverallStat.find();
    res.status(200).json(overallStats[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

module.exports = { getSales };
