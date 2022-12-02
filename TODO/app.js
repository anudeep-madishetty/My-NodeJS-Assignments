const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// app.use(express.json());

send; // status // sendStatus

const fs = require("fs");
fs.writeSync;

const todo = require("./model/todo");
mongoose.connect("mongodb://localhost/todo");
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyparser()); //?

app.use(express.static("public"));

app.get("/", async (req, res) => {
  //   res.send("ok");
  const data = await todo.find();
  // console.log(data);
  res.render("todo.ejs", { data });
});

app.post("/todo/add", async (req, res) => {
  // console.log(req.body);
  const todoname = await todo.create({
    todoname: req.body.todoname,
  });
  res.redirect("/");
});

app.post("/update/:id/todo", async (req, res) => {
  // console.log("in update fn");
  // console.log(req.params);
  const data = await todo.updateOne(
    { _id: req.params.id },
    { taskstatus: true }
  );
  res.redirect("/");
});
// app.post("/delete/:id/todo", async (req, res) => {
//   // console.log("in delete fn");
//   const data = await todo.deleteOne({ _id: req.params.id });
//   res.redirect("/");
// });
app.delete("/delete/:id/todo", async (req, res) => {
  // console.log("in delete fn");
  const data = await todo.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("sever is up at 5000");
});

//req and res?
//req.body
//res.body
//res.params
//req.params
