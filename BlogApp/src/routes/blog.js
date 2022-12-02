const router = require("express").Router();
const Blog = require("../models/Blog");
// Your routing code goes here
// const bodyparser = require("body-parser");
// router.use(bodyparser()); //?

router.get("/blog", async (req, res) => {
  if (req.query.page && req.query.search) {
    const value = req.query.search;
    const createIn = await Blog.schema.index({ topic: "text" });
    const data = await Blog.find()
      .skip((req.query.page - 1) * 5)
      .limit(5)
      .find({ $text: { $search: `"\"${value}\""` } });

    res.json({ status: "success", result: data });
  } else if (req.query.page) {
    const data = await Blog.find()
      .skip((req.query.page - 1) * 5)
      .limit(5);
    res.json({ status: "success", result: data });
  } else if (req.query.search) {
    const value = req.query.search;
    console.log("value ", value);
    const createIn = await Blog.schema.index({ topic: "text" });
    const data = await Blog.find({ $text: { $search: `"\"${value}\""` } });
    res.json({ status: "success", result: data });
  }

  // db.users.find({ key: { $regex: new RegExp(value, "i") } });
  // db.collection.findOne({ name: { $regex: /string/ } });

  // var CircularJSON = require("circular-json");
  // const data = CircularJSON.stringify(
  //   Blog.findOne({ topic: { $regex: value } })
  // );
  // const data = Blog.findOne({ topic: `/${value}/` });

  // const data = Blog.findOne({ topic: { $regex: `/${value}/` } });
  //   const getCircularReplacer = () => {
  //     const seen = new WeakSet();
  //     return (key, value) => {
  //       if (typeof value === "object" && value !== null) {
  //         if (seen.has(value)) {
  //           return;
  //         }
  //         seen.add(value);
  //       }
  //       return value;
  //     };
  //   };

  //   const data = Blog.find({ topic: `/${value}/` });

  //   const result = JSON.stringify(data, getCircularReplacer());
  //   res.json({ status: "success", result: JSON.parse(result) });
  // }

  // try {
  //   const data = await Blog.find().limit(req.query.page * 5);
  //   res.json({ status: "success", result: data });
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({ message: err.message });
  // }
});

router.post("/blog", async (req, res) => {
  const data2 = await Blog.create({
    topic: req.body.topic,
    description: req.body.description,
    posted_at: req.body.posted_at,
    posted_by: req.body.posted_by,
  });
  res.json({ status: "success", result: data2 });
});

router.put("/blog/:id", async (req, res) => {
  const data = await Blog.findOne({ _id: req.params.id });
  //   console.log("before data", data.topic);
  //   console.log("request body", req.body.topic, req.body.posted_by);
  if (req.body.topic) data.topic = req.body.topic;
  if (req.body.description) data.description = req.body.description;
  if (req.body.posted_at) data.posted_at = req.body.posted_at;
  if (req.body.posted_by) data.posted_by = req.body.posted_by;
  //   console.log("after data", data);
  const updatedData = await Blog.updateOne(
    { _id: req.params.id },
    { $set: data }
  );
  res.json({ status: "success", result: data });
});

router.delete("/blog/:id", async (req, res) => {
  const data = await Blog.findOne({ _id: req.params.id });
  const deletedData = await Blog.deleteOne({ _id: req.params.id });
  res.json({ status: "success", result: data });
});

module.exports = router;
