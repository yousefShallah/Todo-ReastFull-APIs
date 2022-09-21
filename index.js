const express = require("express");
const mongoose = require("mongoose"); // new
const app = express();
const dotenv = require("dotenv");
const Routers = require("./routes/index");
const cors = require("cors");
var bodyParser = require("body-parser");
const path = require("path");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

const port = 5000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("Successfully connected to MongoDB"));
db.on("error", (e) => console.log(e));
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
app.use("/", Routers);

app.listen(port, (req, res) => {
  console.log(`Server has started on: https://localhost:${port}`);
});
