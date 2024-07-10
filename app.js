const express = require("express");
const path = require("path");
const UserRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/auth");
const blogRoutes = require("./routes/blog");

const Blog = require("./models/blog");
const User = require("./models/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/youtube_blog")
  .then(console.log("db connected"));

const app = express();
const port =process.env.PORT|| 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  //const desire = await User.findById(req.user._id);

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", UserRoutes);
app.use("/blog", blogRoutes);
app.listen(port, () => console.log("server started at port :8000"));
