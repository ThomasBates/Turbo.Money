import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BankAccountEditView = ({ viewModel }) => {

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
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={viewModel.item.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            name="description"
                            value={viewModel.item.description}
                            isValid={viewModel.isValidDescription}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            id="categoryId"
                            name="categoryId"
                            value={viewModel.item.categoryId}
                            isValid={viewModel.isValidCategoryId}
                            onChange={handleInputChange} >
                            <option value="0" key="0">
                                Select a Category
                            </option>
                            {viewModel.categories.map(category => (
                                <option value={category.id} key={category.id} >
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Budgeted Amount</Form.Label>
                        <Form.Control
                            id="amount"
                            name="amount"
                            value={viewModel.item.amount}
                            isValid={viewModel.isValidAmount}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount Type</Form.Label>
                        <Form.Select
                            id="type"
                            name="type"
                            value={viewModel.item.type}
                            isValid={viewModel.isValidType}
                            onChange={handleInputChange}
                        >
                            {viewModel.amountTypes.map(type => (
                                <option value={type.value} key={type.value}>{type.text}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                            id="method"
                            name="method"
                            value={viewModel.item.method}
                            isValid={viewModel.isValidMethod}
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

export default BankAccountEditView;