
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const ModeView = ({ modeView, viewModel }) => modeView({ viewModel });

export default function CommonView({ viewModel, modeViews }) {
    viewModel = viewModel();

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>{viewModel.title}</h4>

                <ListGroup>
                    {viewModel.list &&
                        viewModel.list.map((listItem, index) => (
                            <ListGroup.Item
                                className={index === viewModel.selectedIndex ? "active" : ""}
                                onClick={() => viewModel.selectItem(listItem)}
                                key={index}
                                disabled={!viewModel.canSelectItem}
                            >
                                {listItem.name}
                            </ListGroup.Item>
                        ))}
                </ListGroup>

                <div className="col-md-8">
                    <Button variant="success" onClick={viewModel.addItem} disabled={!viewModel.canAddItem}>
                        Add
                    </Button>
                    <Button variant="warning" onClick={viewModel.editItem} disabled={!viewModel.canEditItem}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={viewModel.deleteItem} disabled={!viewModel.canDeleteItem}>
                        Delete
                    </Button>
                </div>
            </div>

            <div className="col-md-6">
                <ModeView modeView={modeViews[viewModel.mode]} viewModel={viewModel.modeViewModel} />
            </div>
        </div>
    );
};
