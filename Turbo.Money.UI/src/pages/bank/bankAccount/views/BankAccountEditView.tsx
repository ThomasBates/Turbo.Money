
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import IViewProps from 'pages/common/views/IViewProps';
import IBankAccountEditViewModel from '../viewModels/IBankAccountEditViewModel';

export default function BankAccountEditView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBankAccountEditViewModel;


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
                        <Form.Label>Bank</Form.Label>
                        <Form.Select
                            id="bankId"
                            name="bankId"
                            value={viewModel.account.bankId}
                            isValid={viewModel.isValidBankId}
                            onChange={handleSelectChange} >
                            <option value="0" key="0">
                                Select a Bank
                            </option>
                            {viewModel.banks.map(bank => (
                                <option value={bank.id} key={bank.id} >
                                    {bank.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
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
                            isValid={true}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                            id="number"
                            name="number"
                            value={viewModel.account.number}
                            isValid={viewModel.isValidNumber}
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
