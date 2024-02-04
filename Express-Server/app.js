var express = require("express");
var app = express();
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get("/api/add", (request, response) => {
    const { firstNumber = 0, secondNumber = 0 } = request.query;
    const addition = parseInt(firstNumber) + parseInt(secondNumber);
    response.status(200).send({
        success: 'true',
        addition
    })
});