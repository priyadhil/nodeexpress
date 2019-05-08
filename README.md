# nodeexpress
pushing data to json, fetch data from json and using get & post method in Express
===============================================================
>npm init
>npm i express
>npm i -D nodemon
>change scripts to watch the server constantly
>npm run dev
>npm i uuid
>npm I express-handlebars
===================================================================
#Members.js
======================
const members = [
  {
    id: 1,
    name: "john",
    email: "john@gmail.com",
    status: "active"
  },
  {
    id: 2,
    name: "john doe",
    email: "johndoe@gmail.com",
    status: "inactive"
  },
  {
    id: 1,
    name: "doe",
    email: "doe@gmail.com",
    status: "active"
  }
];
module.exports = members;

========================================================
#package.json
=============
{
  "name": "node-express-practice",
  "version": "1.0.0",
  "description": "node-express",
  "main": "index.js",
  "scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },
  "repository": {
    "type": "git",
    "url": "nodeexpress"
  },
  "keywords": [
    "node",
    "express"
  ],
  "author": "priya",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.16.4",
    "express-handlebars": "^3.0.2",
    "nodemon": "^1.19.0",
    "uuid": "^3.3.2"
  }
}

===================================================================

Index.js
==============
const express = require("express");
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
members.js
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
==========================================================

index.handlebars
=========================
<h1 class="text-center mb-3">{{title}}</h1>
<div class="card  mt-5456">
    <form action="/api/members" method="POST" class="form-inline mb-5">
        <div class="form-group">
            <label for="name">
                Name
            </label>
            <input type="text" name="name" class=" ml-2 form-control">
        </div>
        <div class="form-group ml-2">
            <label for="Email">
                Email
            </label>
            <input type="email" name="email" class="form-control ml-2">
        </div>
        <input type="submit" value="Add Member" class="ml-2 btn btn-warning">
    </form>
</div>
<h4 class="text-center mb-3">Members</h4>
<ul class="list-group">
    {{#each members}}
    <li class="list-group-item">{{this.name}} : {{this.email}} </li>
    {{/each}}
</ul>
<a href="/api/members" class="btn btn-dark mt-4">view API</a>
=====================================================================================
Main.handlebars
==================
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Members</title>
</head>

<body>
    <div class="container mt-4">
        {{{body}}}
    </div>
</body>

</html>


 

