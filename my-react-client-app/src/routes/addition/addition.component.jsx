import React, { useState } from "react";
import axios from "axios";

const Addition = () => {
  const [fnumber, setFirstNumber] = useState();

  const [snumber, setSecondNumber] = useState();

  const [additionOfTwoNumbers, setAdditionOfTwoNumbers] = useState(0);

  const [serverAdditionData, setDataFromServer] = useState(null);

  const [serverPostAdditionData, setPostDataFromServer] = useState(null);

  const calcuateAdditionOfTwoNumbers = (evt) => {
    evt.preventDefault();

    // set addition data from reactjs
    setAdditionOfTwoNumbers(parseInt(fnumber) + parseInt(snumber));

    // replace this url with EC2 instance url from AWS
    const baseURL = "http://localhost:5000/";

    // set addition data from server with GET call using XMLHttpRequest
    const xhr = new XMLHttpRequest();

    const getURL = `${baseURL}api/addTwoNumbers`;

    const urlWithParams = `${getURL}?firstNumber=${fnumber}&secondNumber=${snumber}`;

    xhr.open("GET", urlWithParams, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        setDataFromServer(JSON.parse(xhr.responseText));
      }
    };

    xhr.send();

    // set addition data from server with POST call using axios
    const postURL = `${baseURL}api/sumOfTwoNumbers`;
    const body = {
      firstNumber: fnumber,
      secondNumber: snumber,
    };

    axios
      .post(postURL, body)
      .then((response) => setPostDataFromServer(response.data));
  };

  return (
    <div>
      <div class="container mt-5">
        <div class="d-flex flex-row mb-3 text-start">
          <span class="col-2" id="f-number">
            First Number
          </span>
          <input
            type="number"
            class="form-control"
            placeholder="enter first number"
            aria-label="fnumber"
            aria-describedby="f-number"
            value={fnumber}
            onChange={(e) => setFirstNumber(e.target.value)}
          />
        </div>

        <div class="d-flex flex-row mb-5 text-start">
          <span class="col-2" id="s-number">
            Second Number
          </span>
          <input
            type="number"
            class="form-control"
            placeholder="enter second number"
            aria-label="snumber"
            aria-describedby="s-number"
            value={snumber}
            onChange={(e) => setSecondNumber(e.target.value)}
          />
        </div>

        <div class=" text-start d-flex offset-md-2 mb-5">
          <button
            type="button"
            class="btn btn-primary"
            onClick={calcuateAdditionOfTwoNumbers}
          >
            Submit
          </button>
        </div>

        <div className="mt-5 text-start">
          <h3>
            Your Addition result (from ReactJs) is: {additionOfTwoNumbers || 0}
          </h3>
          <h3>
            Your Addition result (from Server - GET) is:
            {serverAdditionData?.sum || 0}
          </h3>
          <h3>
            Your Addition result (from Server - POST) is:
            {serverPostAdditionData?.sum || 0}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Addition;
