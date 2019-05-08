const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//get all members
router.get("/", (req, res) => res.json(members));

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and Email" });
  }
  members.push(newMember);
  // res.json(members);
  res.redirect("/");
});
module.exports = router;
