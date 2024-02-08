const express = require("express");

const cors = require('cors');

const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Express Server running/listening on port ${PORT}`);
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

