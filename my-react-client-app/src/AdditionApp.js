import React, { useState } from 'react';

export default function AdditionApp() {

    const [fnumber, setFirstNumber] = useState();

    const [snumber, setSecondNumber] = useState();

    const [additionOfTwoNumbers, setAdditionOfTwoNumbers] = useState(0);

    const [serverAdditionData, setDataFromServer] = useState(null);

    function calcuateAdditionOfTwoNumbers() {

        setAdditionOfTwoNumbers(fnumber + snumber);

        const xhr = new XMLHttpRequest();

        const url = 'http://localhost:5000/api/add';

        const urlWithParams = `${url}?firstNumber=${fnumber}&secondNumber=${snumber}`;

        xhr.open('GET', urlWithParams, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                setDataFromServer(JSON.parse(xhr.responseText));
            }
        };

        xhr.send();
    }

    return (
        <div>
            <div class="container mt-5">

                <div class="d-flex flex-row mb-3 text-start">
                    <span class="col-2" id="f-number">First Number</span>
                    <input type="number" class="form-control" placeholder="enter first number" aria-label="fnumber" aria-describedby="f-number"
                        value={fnumber}
                        onChange={(e) => setFirstNumber(+e.target.value)}
                    />
                </div>

                <div class="d-flex flex-row mb-5 text-start">
                    <span class="col-2" id="s-number">Second Number</span>
                    <input type="number" class="form-control" placeholder="enter second number" aria-label="snumber" aria-describedby="s-number"
                        value={snumber}
                        onChange={(e) => setSecondNumber(+e.target.value)}
                    />
                </div>

                <div class=" text-start d-flex offset-md-2 mb-5">
                    <button type="button" class="btn btn-primary" onClick={calcuateAdditionOfTwoNumbers}>Submit</button>
                </div>

                <div className='mt-5 text-start'>
                    <h3>Your Addition result (from Server) is: {serverAdditionData?.addition || 0}</h3>
                    <h3>Your Addition result (from ReactJs) is: {additionOfTwoNumbers || 0}</h3>
                </div>

            </div>

        </div>
    )
}