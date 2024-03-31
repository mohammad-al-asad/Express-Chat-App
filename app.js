// Externel imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// Internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewaers/common/errorHandler");
const inboxRouter = require("./routes/inboxRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

const app = express();
dotenv.config();

// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server connection
mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Set veiw engine
app.set("view engine", "ejs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Routes
app.use("/", loginRouter);
app.use("/user", userRouter);
app.use("/inbox", inboxRouter);

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);

// Listen server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
