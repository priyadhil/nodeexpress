const express = require("express");
const uuid = require("uuid");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!!!</h1>");
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member",
    members
  })
);
app.post("/", (req, res) => {
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
  res.json(members);
});

//set the static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
