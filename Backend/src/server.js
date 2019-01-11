//const cors = require('cors');
const error = require("../middleware/error");
let startupDebugger = require("debug")("app:startup");
let auth = require("../routes/auth");
let users = require("../routes/users");
let todos = require("../routes/todos");
let express = require("express");
let helmet = require("helmet");
let morgan = require("morgan");
let config = require("config");

let app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

console.log("Working on " + config.get("name"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Expose-Headers", "xAuthToken")
  next();
});

app.get("/", function (req, res, next) {
  // Handle the get for this route
});

app.post("/", function (req, res, next) {
  // Handle the post for this route
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static("src"));
app.use(helmet());
app.use("/api/users", users);
app.use("/api/dashboard", todos);
app.use("/api/auth", auth);
app.use(error);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled");
}

let port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log("Listening on port " + port);
});