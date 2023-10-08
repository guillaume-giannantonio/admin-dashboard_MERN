const User = require("../models/User");

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

module.exports = { getUser };
