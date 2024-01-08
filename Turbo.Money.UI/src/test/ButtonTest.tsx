declare var require: any
var React = require('react');

import { useState } from 'react';

import Alert from './Alert';
import Button from './Button';


function ButtonTest() {
    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setAlertVisible(true)}>
                Make It sew!
            </Button>
            {
                alertVisible &&
                <Alert onDismiss={() => setAlertVisible(false)}>
                    Danger Will Robinson!
                </Alert>
            }
        </div>
    );
}

export default ButtonTest;