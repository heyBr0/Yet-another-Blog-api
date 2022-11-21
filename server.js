require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
const cors = require("cors")
const PORT = process.env.PORT || 4000;
// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors({origin:"https://yet-another-blog-8ap3.onrender.com"}))

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connected to DB and listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

 