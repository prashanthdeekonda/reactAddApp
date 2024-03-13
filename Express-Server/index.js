// import { generateUploadURL } from "./routes/api/s3.mjs";
// import express from 'express';
const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const axios = require("axios");

const path = require("path");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs").promises;
const retrieveSecrets = require("./routes/api/retrieveSecrets");

// const generateUploadURL = require("./routes/api/s3")

// Connect Database
const connectDB = require("./config/mongoosedb");

app.use(express.static(path.join(__dirname, "public")));

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
const { generateUploadURL } = require("./routes/api/ss3");

// const s3 = require("./routes/api/s3");

app.listen(PORT, async () => {
  try {
    //get secretsString:
    const secretsString = await retrieveSecrets();

    //write to .env file at root level of project:
    await fs.writeFile(".env", secretsString);

    //configure dotenv package
    dotenv.config();

    console.log("Server running on port 5000");
  } catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
  }
  console.log(
    `Express Server running/listening on port http://localhost:${PORT}/`
  );
});

//routes to verify that the secrets were retrieved successfully.
app.get("/api/secrets", (req, res) => {
  return res.status(200).json({
    SECRET_1: process.env.AWS_ACCESS_KEY_ID,
    SECRET_2: process.env.AWS_SECRET_ACCESS_KEY,
    SECRET_3: process.env.MONGOOSE_DB_CONNECTION_STRING,
    SECRET_4: process.env.API_KEY,
    SECRET_5: process.env.API_HOST,
  });
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

// s3URL
app.get("/api/s3/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.get("/api/books", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://books-api7.p.rapidapi.com/books/find/genres",
    params: {
      "genres[]": ["fantasy", "fiction", "Classics"],
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };
  // "eaed3af1eemshe894b69298432ccp10d934jsn9fa0b2a61780"

  const response = await axios.request(options);
  res.send(response.data);
  // response.then((items) => res.json(items))
  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data);
  //   res.send(response);
  // } catch (error) {
  //   console.error(error);
  // }
});
