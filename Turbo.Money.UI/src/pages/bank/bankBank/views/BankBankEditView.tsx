
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import IViewProps from 'pages/common/views/IViewProps';
import IBankBankEditViewModel from '../viewModels/IBankBankEditViewModel';

export default function BankBankEditView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBankBankEditViewModel;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
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
                            value={viewModel.bank.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bank Number</Form.Label>
                        <Form.Control
                            id="number"
                            name="number"
                            value={viewModel.bank.number}
                            isValid={viewModel.isValidNumber}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Branch Number</Form.Label>
                        <Form.Control
                            id="branch"
                            name="branch"
                            value={viewModel.bank.branch}
                            isValid={viewModel.isValidBranch}
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
