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
const { dataUser, dataProduct, dataProductStat } = require("./data/index");

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
      // User.insertMany(dataUser)
      /*Product.insertMany(dataProduct)
        .then((value) => console.log("valide: " + value))
        .catch((e) => console.log(e));
      ProductStat.insertMany(dataProductStat)
        .then((value) => console.log("valide: " + value))
        .catch((e) => console.log(e));*/
    });
  })
  .catch((err) => console.log(err));
