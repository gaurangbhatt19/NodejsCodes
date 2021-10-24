const express = require("express");
const userRouter = require("./routes/users");
const middlewareLog = (req, res, next) => {
  console.log(req.originalUrl);
  next();
};

const app = express();
app.use(middlewareLog);
app.set("view-engine", "ejs");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  // res.sendStatus(500);
  //   res.send("Server");
  //res.download("index.js");
  res.render("index.ejs", { name: "Gaurang Bhatt" });
});

app.listen("3030", () => {
  console.log("Server Started");
});
