import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import IViewProps from './IViewProps';
import ICommonViewProps from './ICommonViewProps';
import ICommonViewModel from '../viewModels/ICommonViewModel';

interface IModeViewProps {
    SelectedModeView: (props: IViewProps) => JSX.Element;
    dataContext: object;
}

const ModeView = ({ SelectedModeView, dataContext }: IModeViewProps) => {
    return (
        <SelectedModeView dataContext={dataContext} />
    );
}

export default function CommonView({ dataContext, modeViews }: ICommonViewProps) {

    const viewModel = dataContext() as ICommonViewModel;
    const modeView = modeViews[viewModel.mode];

    useEffect(() => {
        viewModel.loadData();
    }, []);

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
                <ModeView SelectedModeView={modeView} dataContext={viewModel.modeViewModel} />
            </div>
        </div>
    );
}
