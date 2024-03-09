const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();


// Connect Database
const connectDB = require("./config/mongoosedb");

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));
// Init Middleware
app.use(express.json({ extended: false }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;


// routes
const inventory = require("./routes/api/inventory");

app.listen(PORT, () => {
  console.log(
    `Express Server running/listening on port http://localhost:${PORT}/`
  );
});

app.get("/", (request, response) => {
  response.send("hello this is a test service");
});

app.get("/api/addTwoNumbers", (request, response) => {
  const { firstNumber = 0, secondNumber = 0 } = request.query;

  const sum = parseInt(firstNumber) + parseInt(secondNumber);

  response.status(200).send({ sum });
});

app.post("/api/sumOfTwoNumbers", (request, response) => {
  const { firstNumber = 0, secondNumber = 0 } = request.body;

  const sum = parseInt(firstNumber) + parseInt(secondNumber);

  return response.status(200).send({ sum });
});

// use the routes module as a middleware
// for the /api/inventory path
app.use("/api/inventory", inventory);

// Connect Database
connectDB();