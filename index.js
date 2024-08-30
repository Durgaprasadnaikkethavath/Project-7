const express = require("express");
const app = express();
const port = 3800;
const path = require("path");
const bcrypt = require("bcrypt");

require("./db/conn");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// schema of database collection name

const userCollection = require("./model/schema");

app.get("/", (req, res) => {
  res.render("login");
  s;
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/partials/Product", (req, res) => {
  res.render("partials/Product");
});

app.get("/partials/Products", (req, res) => {
  res.render("partials/Products");
});

app.get("/partials/About", (req, res) => {
  res.render("partials/About");
});
app.get("/partials/Contact", (req, res) => {
  res.render("partials/Contact");
});

// Register Page
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const existingUser = await userCollection.findOne({
    name: data.name,
  });

  if (existingUser) {
    res.send("User already exists. Please choose a different username.");
  } else {
    // hash password
    const saltRecords = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRecords);

    data.password = hashedPassword;

    const userData = await userCollection.insertMany(data);
    console.log(userData);
  }
});

app.post("/login", async (req, res) => {
  try {
    // user name
    const userNameCheck = await userCollection.findOne({
      name: req.body.username,
    });

    if (!userNameCheck) {
      res.send("user name cannot found");
    }

    // user password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      userNameCheck.password
    );

    //
    if (isPasswordMatch) {
      res.render("index");
    } else {
      req.send("wrong password");
    }
  } catch {
    console.log("Wrong details");
  }
});

app.listen(port, (req, res) => {
  console.log(`server listening at port ${port}`);
});
