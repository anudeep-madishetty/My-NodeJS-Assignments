const express = require("express");
const nodemon = require("nodemon");
const app = express();
const bodyParser = require("body-parser"); //?

app.use(express.urlencoded()); //?
app.use(express.json()); //?
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.end("hello worlds");
  res.render("form.ejs");
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkError(req, res) {
  if (!isNumeric(req.body.num1) || !isNumeric(req.body.num2)) {
    res.status(200).send({
      status: "error",
      message: "Invalid data types",
    });
    return true;
  } else if (
    Number(req.body.num1) < -1000000 ||
    Number(req.body.num2) < -1000000 ||
    Number(req.body.num1) + Number(req.body.num2) < -1000000
  ) {
    res.status(200).send({
      status: "error",
      message: "underflow",
    });
    return true;
  } else if (
    Number(req.body.num1) > 1000000 ||
    Number(req.body.num2) > 1000000 ||
    Number(req.body.num1) + Number(req.body.num2) > 1000000
  ) {
    res.status(200).send({
      status: "error",
      message: "overflow",
    });
    return true;
  } else return false;
}

app.post("/add", (req, res) => {
  // console.log(req.params);
  // result.num1 = req.body.num1;
  // result.num2 = req.body.num2;
  // console.log(req.body);
  if (!checkError(req, res)) {
    res.status(200).send({
      status: "success",
      message: "the sum of given two numbers",
      sum: Number(req.body.num1) + Number(req.body.num2),
    });
  }
});

app.post("/subtract", (req, res) => {
  if (!checkError(req, res)) {
    res.status(200).send({
      status: "success",
      message: "the difference of give two numbers",
      difference: Number(req.body.num1) - Number(req.body.num2),
    });
  }
});

app.post("/multiply", (req, res) => {
  if (!checkError(req, res)) {
    res.status(200).send({
      status: "success",
      message: "the product of given numbers",
      result: Number(req.body.num1) * Number(req.body.num2),
    });
  }
});

app.post("/divide", (req, res) => {
  if (Number(req.body.num2 == 0)) {
    res.status(200).send({
      status: "error",
      message: "Cannot divide by zero",
    });
  } else if (!checkError(req, res)) {
    res.status(200).send({
      status: "success",
      message: "the division of given numbers",
      result: Number(req.body.num1) / Number(req.body.num2),
    });
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
