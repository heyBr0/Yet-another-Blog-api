const express = require("express");
const {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const requireAuth = require("../middleware/requireAuth")

const router = express.Router();
// require Auth for all routes
router.use(requireAuth)

// GET all blogs
router.get("/", getBlogs);

// GET a single blog
router.get("/:id", getBlog);

// POST a new blog
router.post("/", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

module.exports = router;
