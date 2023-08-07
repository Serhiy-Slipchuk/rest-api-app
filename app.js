const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users")

require("dotenv").config();

const { middlewarePostPut, middlewarePatch, middlewareAuth } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";


// =================================================MIDDLEWARES=======================================
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", middlewarePostPut, middlewarePatch, middlewareAuth, contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({message: err.message});
}
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
