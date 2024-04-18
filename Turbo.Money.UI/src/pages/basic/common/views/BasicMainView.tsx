import { useEffect } from 'react';

import IStyledViewProps from 'common/views/IStyledViewProps';

import { combineStyles, mergeStyles } from 'services/tools/tools';

import IBasicMainViewModel from '../viewModels/IBasicMainViewModel';

import BasicButton from './BasicButton';
import IBasicMainViewProps from './IBasicMainViewProps';

import defaultStyleModule from './BasicMainView.module.css';

interface IModeViewProps extends IStyledViewProps {
    SelectedModeView: (props: IStyledViewProps) => JSX.Element;
}

const ModeView = ({ SelectedModeView, style, dataContext }: IModeViewProps) => {
    return (
        <SelectedModeView dataContext={dataContext} style={style} />
    );
}

export default function BasicMainView({ dataContext, customStyle, modeViews }: IBasicMainViewProps) {

    const viewModel = dataContext() as IBasicMainViewModel;
    const style = mergeStyles(customStyle, defaultStyleModule);
    const modeView = modeViews[viewModel.mode];

    useEffect(() => {
        viewModel.loadData();
    }, []);

    return (
        <div className={style.main_form}>
            <h1 className={combineStyles(style.title_panel, style.title)}>{viewModel.title}</h1>
            <div className={style.main_panel}>
                <div className={style.list_panel}>

                    <ul className={combineStyles(style.list_control, style.list)}>
                        {viewModel.list &&
                            viewModel.list.map((listItem, index) => {

                                const itemControl = viewModel.canSelectItem
                                    ? style.list_item_control
                                    : style.disabled_list_item_control;
                                const itemTheme = viewModel.canSelectItem
                                    ? (index === viewModel.selectedIndex
                                        ? style.enabled_selected_list_item
                                        : style.enabled_unselected_list_item)
                                    : (index === viewModel.selectedIndex
                                        ? style.disabled_selected_list_item
                                        : style.disabled_unselected_list_item);
                                const className = combineStyles(itemControl, itemTheme);

                                return (
                                    <li
                                        className={className}
                                        onClick={() => viewModel.selectItem(listItem)}
                                        key={index}
                                    //disabled={!viewModel.canSelectItem}
                                    >
                                        {listItem.name}
                                    </li>
                                );
                            })}
                    </ul>

                    <div className={style.button_panel}>
                        <BasicButton style={style}
                            variant='add'
                            label='Add'
                            onClick={viewModel.addItem}
                            disabled={!viewModel.canAddItem} />
                        <BasicButton style={style}
                            variant='edit'
                            label='Edit'
                            onClick={viewModel.editItem}
                            disabled={!viewModel.canEditItem}/>
                        <BasicButton style={style}
                            variant='delete'
                            label='Delete'
                            onClick={viewModel.deleteItem}
                            disabled={!viewModel.canDeleteItem}/>
                    </div>
                </div>

                <div className={style.mode_panel}>
                    <ModeView
                        SelectedModeView={modeView}
                        dataContext={viewModel.modeViewModel}
                        style={style}
                    />
                </div>
            </div>
        </div>
    );
}
