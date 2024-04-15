
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import IViewProps from 'pages/common/views/IViewProps';

import IBudgetAccountEditViewModel from '../viewModels/IBudgetAccountEditViewModel';

export default function BankAccountEditView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBudgetAccountEditViewModel;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        viewModel.setProperty(name, value);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
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
                            value={viewModel.account.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="description"
                            name="description"
                            value={viewModel.account.description}
                            isValid={viewModel.isValidDescription}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            required
                            id="categoryId"
                            name="categoryId"
                            value={viewModel.account.categoryId}
                            isValid={viewModel.isValidCategoryId}
                            onChange={handleSelectChange} >
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
                            required
                            type="number"
                            id="amount"
                            name="amount"
                            value={viewModel.account.amount}
                            isValid={viewModel.isValidAmount}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount Type</Form.Label>
                        <Form.Select
                            id="type"
                            name="type"
                            value={viewModel.account.type}
                            isValid={viewModel.isValidType}
                            onChange={handleSelectChange}
                        >
                            {viewModel.amountTypes.map(type => (
                                <option value={type.value} key={type.value}>{type.text}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="method"
                            name="method"
                            value={viewModel.account.method}
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
}
