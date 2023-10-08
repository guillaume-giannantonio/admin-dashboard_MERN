const Product = require("../models/Product");
const ProductStat = require("../models/ProductStat");
const User = require("../models/User");

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      }),
    );
    res.status(200).json(productsWithStats);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

async function getCustomers(req, res) {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

module.exports = { getProducts, getCustomers };
