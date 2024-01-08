declare var require: any
var React = require('react');

import ListGroup from './ListGroup';

function BatesList() {
    let bates = [
        'Lilian',
        'Thomas',
        'Nathan',
        'Matthew',
        'Jade',
        'Laura'
    ];

    return (
        <ListGroup items={bates} heading="Bates" onItemSelected={(name) => console.log(name, "Bates")} />
    );
}

export default BatesList;