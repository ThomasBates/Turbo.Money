//import React from "react";
declare var require: any

var React = require('react');
//import 'bootstrap/dist/css/bootstrap.css'

import ListGroup from './ListGroup';

function CitiesList() {

    let cities = [
        'Calgary',
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris'
    ];

    return (
        <ListGroup items={cities} heading="Cities" onItemSelected={(city) => console.log("Sweet home", city)} />
    );
}

export default CitiesList;