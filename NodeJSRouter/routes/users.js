const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.send("User List");
});

router.get("/create", (req, res) => {
  res.send("Create User");
});

router
  .route("/getUser/:id")
  .get((req, res) => {
    console.log(req.userName.name);
    res.send(`GET ${req.params.id} User ${req.userName.name}`);
  })
  .post((req, res) => {
    res.send(`POST ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`PUT ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE ${req.params.id}`);
  });

const user = [{ name: "Gaurang" }];
router.param("id", (req, res, next, id) => {
  req.userName = user[id];
  console.log(id);
  next();
});

module.exports = router;
