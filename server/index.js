const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes/sales.js");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");
const ProductStat = require("./models/ProductStat");
const Transaction = require("./models/Transaction");
const OverallStat = require("./models/OverallStat");
const AffiliateStat = require("./models/AffiliateStat");
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data/index");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
      // AffiliateStat.insertMany(dataAffiliateStat);
      // OverallStat.insertMany(dataOverallStat)
      // User.insertMany(dataUser)
      // Transaction.insertMany(dataTransaction);
      // Product.insertMany(dataProduct)
      // ProductStat.insertMany(dataProductStat)
    });
  })
  .catch((err) => console.log(err));
