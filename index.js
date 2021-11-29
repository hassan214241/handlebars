const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
// const bodyparser = require("body-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3000;

app.engine(
  "handlebars",
  engine({
    layoutsDir: "./views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

const credential = {
  email: "hassan@gmail.com",
  password: "123456",
};

// login user
app.post("/login", (req, res) => {
  console.log(req.body);
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/dashboard");
  } else {
    res.render("home");
  }
});

// route for dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("layouts/dashboard", { user: req.session.user });
  } else {
    res.send("Unauthorize User");
  }
});

// login page route
// app.get("/login", (req, res) => {
//   res.render("layouts/main");
// });

// route to home page
// app.get("/dashboard", (req, res) => {
//   res.render("layouts/dashboard");
// });

// post request
// app.post("/login", (req, res) => {
//   const userEmail = req.body.email;
//   const userPassword = req.body.password;
//   if (email === userEmail && password === userPassword) {
//     res.render("layouts/dashboard");
//   } else {
//     console.log("eorror");
//   }
// });

app.listen(PORT, () => {
  console.log(`app listen ${PORT}`);
});
