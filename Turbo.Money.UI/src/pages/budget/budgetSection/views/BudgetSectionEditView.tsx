
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import IViewProps from 'pages/common/views/IViewProps';

import IBudgetSectionEditViewModel from '../viewModels/IBudgetSectionEditViewModel';

export default function BudgetSectionEditView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBudgetSectionEditViewModel;

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
                        <Form.Label>Section Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            id="name"
                            name="name"
                            value={viewModel.section.name}
                            isValid={viewModel.isValidName}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            id="description"
                            name="description"
                            value={viewModel.section.description}
                            isValid={viewModel.isValidDescription}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Income/Expenses</Form.Label>
                        <Form.Select
                            id="direction"
                            name="direction"
                            value={viewModel.section.direction}
                            isValid={viewModel.isValidDirection}
                            onChange={handleSelectChange}>
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
}
