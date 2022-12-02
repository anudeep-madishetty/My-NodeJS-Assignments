const mongooose = require("mongoose");

const blogSchema = new mongooose.Schema({
  // Your code goes here
  topic: String,
  descriptions: String,
  posted_at: String,
  posted_by: String,
});

const Blog = mongooose.model("blogsapps", blogSchema);

// const user = Blog.create({
//   id: 1,
//   topic: "learn react",
//   descriptions: "react is a front end library",
//   posted_at: "google",
//   posted_by: "anudeep",
// });

module.exports = Blog;
