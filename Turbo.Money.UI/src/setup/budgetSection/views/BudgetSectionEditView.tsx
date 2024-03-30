import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BudgetSectionEditView({ viewModel }) {

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
                        <Form.Label>Section Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            id="name"
                            name="name"
                            value={viewModel.item.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            id="description"
                            name="description"
                            value={viewModel.item.description}
                            isValid={viewModel.isValidDescription}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Income/Expenses</Form.Label>
                        <Form.Select
                            id="direction"
                            name="direction"
                            value={viewModel.item.direction}
                            isValid={viewModel.isValidDirection}
                            onChange={handleInputChange}>
                            <option value="out" key="out">Expenses</option>
                            <option value="in" key="in">Income</option>
                        </Form.Select>
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
