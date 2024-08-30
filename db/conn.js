const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/new_project_7")
  .then(() => console.log("server was connected"))
  .catch(() => console.log("server not connected"));
