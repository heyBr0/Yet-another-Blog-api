require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
const cors = require("cors")
const compression = require('compression');
const PORT = process.env.PORT || 4000;
// express app
const app = express();
app.use(compression());
// middleware
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
); 

app.use(cors({origin:"http://localhost:3000"}))

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



// BUILD
app.get("/", (req, res) =>{
  res.sendFile("./views/build/index.html", {root: "."})
})

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

app.use(express.static("views/build"))


// not found
app.use((req, res, next) => {
  res.status(404).sendFile("./views/pageNotFound.html", { root: "." });
});

// universal error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ success: false, message: error });
});

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

 