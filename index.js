const express = require("express");
//const router = require();
//const bodyParser = require("body-parser");
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set the static folder
app.use(express.static(path.join(__dirname, "public")));
//Members API ROute
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
