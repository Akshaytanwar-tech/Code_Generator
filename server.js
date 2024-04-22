const express = require("express");
const app = express();
const connectTomongo = require("./db");
var bodyParser = require("body-parser");
const { cloudnaryFun } = require("./image");
const user = require("./routes/user");
require("dotenv").config();
connectTomongo();
cloudnaryFun();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
