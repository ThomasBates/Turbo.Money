declare var require: any
var React = require('react');

import axios from 'axios';
import { useState } from 'react';

const client = axios.create({
    baseURL: "https://api.money.turbobutterfly.com",
    headers: {
        "Content-type": "application/json"
    }
});

function AddTest() {

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('Click Add!');

    // ...
    const addNumbers = async (a, b) => {
        let response = await client.post('add', {
            a: a,
            b: b,
        });
        setResult('the sum is: ' + response.data.result);
    };

    // ...
    const multiplyNumbers = async (a, b) => {
        let response = await client.post('mult', {
            a: a,
            b: b,
        });
        setResult('the product is: ' + response.data.result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    //    addNumbers(num1, num2);
    };

    const handleAddButtonClick = () => {
        addNumbers(num1, num2);
    };

    const handleMultButtonClick = () => {
        multiplyNumbers(num1, num2);
    };

    return (
        <div className="posts-container">
            <h1>Add Test</h1>

            <div className="add-test-container">
                {/*<form onSubmit={handleSubmit}>*/}
                <form onSubmit={handleSubmit}>
                    <label>Number 1:</label>
                    <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
                    <label>Number 2:</label>
                    <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
                    {/*<input type="submit" value="Add" />*/}
                    <button onClick={handleAddButtonClick}>Add</button>
                    <button onClick={handleMultButtonClick}>Multiply</button>
                </form>
                <div>{result}</div>
            </div>

        </div>
    );
}

export default AddTest;