const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const lectureRouter = require("./routes/lectureRoutes");
require("./config/connect");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Successfully connected to server.");
});
app.use("/api", adminRouter);
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", lectureRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
