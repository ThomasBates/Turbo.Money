import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BankEditView({ viewModel }) {

    const handleInputChange = event => {
        const { name, value } = event.target;
        viewModel.setProperty(name, value);
    };

    return (
        <div>
            <div className="edit-form">
                <h4>{viewModel.title}</h4>
                <Form>
                    <Form.Group>
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Bank Name"
                            id="name"
                            name="name"
                            value={viewModel.item.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bank Number</Form.Label>
                        <Form.Control
                            id="number"
                            name="number"
                            value={viewModel.item.number}
                            isValid={viewModel.isValidNumber}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Transit Number</Form.Label>
                        <Form.Control
                            id="transit"
                            name="transit"
                            value={viewModel.item.transit}
                            isValid={viewModel.isValidTransit}
                            onChange={handleInputChange} />
                    </Form.Group>
                </Form>
                <Button
                    variant="success"
                    onClick={viewModel.submit}
                    disabled={!viewModel.canSubmit}>
                    Submit
                </Button>
                <Button
                    variant="danger"
                    onClick={viewModel.cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};
