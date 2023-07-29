const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users")

require("dotenv").config();

const { middlewarePostPut, middlewarePatch, middlewareUsers } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";


// =================================================MIDDLEWARES=======================================
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", middlewarePostPut, middlewarePatch, contactsRouter);
app.use("/api/users", middlewareUsers, usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
