const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// const categoryRoutes = require("./routes/categoryRoutes");
const user = require("./routes/user");
const auth = require("./routes/auth");

const marqueRoutes = require("./routes/descriptionRoutes");
const productRoutes = require("./routes/productRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const layoutconfRoutes = require("./routes/layoutconfRoutes");
const produitCoursRoutes = require("./routes/productCoursRoutes");
const imageRoutes = require("./routes/imageRoutes");
const impressionRoutes = require("./routes/prixchoixRoutes");
const ipbbpackRoutes = require("./routes/ipbpackRoutes");
const specialtiesRoutes = require("./routes/specialtiesRoutes");
dotenv.config();
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Connection to DataBase
mongoose
  .connect(
    "mongodb+srv://ipb2420:CDsYU3g5LUDistnT@ipb.khywjzr.mongodb.net/ipbDB?retryWrites=true&w=majority",
    connectionParams
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//MiddleWares
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());
app.use(express.static("public"));
console.log("test");
// app.use("/category", categoryRoutes);
app.use("/description", marqueRoutes);
app.use("/product", productRoutes);
app.use("/productcours", produitCoursRoutes);
app.use("/commande", commandeRoutes);
app.use("/layout", layoutconfRoutes);
app.use("/image", imageRoutes);
app.use("/impression", impressionRoutes);
app.use("/ipbpack", ipbbpackRoutes);
app.use("/auth", auth);
const specialtiesController = require("./controllers/specialtiesController");
specialtiesController.initializeSpecialties();
app.use("/specialties", require("./routes/specialtiesRoutes"));
const specialiteConcoursController = require("./controllers/specialiteConcoursController");
specialiteConcoursController.initializeSpecialties();
app.use("/specialiteConcours", require("./routes/specialiteConcoursRoutes"));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});
module.exports = app;
