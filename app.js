// Externel imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

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

// Socket
const server = http.createServer(app);

const io = new Server(server);
global.io = io;

// Server connection
mongoose
  .connect(
    "mongodb+srv://maasad:maasad@cluster0.unaalto.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
server.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
