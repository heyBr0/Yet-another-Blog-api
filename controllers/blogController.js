const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET all blogs
const getBlogs = async (req, res) => {
  const user_id = req.user._id;
  const allBlogs = await Blog.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(allBlogs);
};

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }
  res.status(200).json(blog);
};

// create new blog
const createBlog = async (req, res) => {
  const { title, text, imgFile } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const blog = await Blog.create({
      title,
      text,
      imgFile,      
      user_id,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }
  res.status(200).json(blog);
};
// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    );
  if (!blog) {
    return res.status(404).json({ error: "No such blog" });
  }
  res.status(200).json(blog);
};

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
};
