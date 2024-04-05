
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BudgetCategoryEditView({ viewModel }) {

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
                        <Form.Label>Category Name</Form.Label>
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
                            required
                            type="text"
                            id="description"
                            name="description"
                            value={viewModel.item.description}
                            isValid={viewModel.isValidDescription}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Section</Form.Label>
                        <Form.Select
                            required
                            id="sectionId"
                            name="sectionId"
                            value={viewModel.item.sectionId}
                            isValid={viewModel.isValidSectionId}
                            onChange={handleInputChange} >
                            <option value="0" key="0">
                                Select a Section
                            </option>
                            {viewModel.sections.map(section => (
                                <option value={section.id} key={section.id} >
                                    {section.name}
                                </option>
                            ))}
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
