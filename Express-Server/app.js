var express = require("express");

var app = express();

var PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/api/add", (request, response) => {

    const { firstNumber = 0, secondNumber = 0 } = request.query;

    const addition = parseInt(firstNumber) + parseInt(secondNumber);

    response.status(200).send({

        success: 'true',
        addition

    })

});