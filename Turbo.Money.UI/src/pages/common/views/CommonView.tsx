import { useEffect } from 'react';

import { combineStyles, mergeStyles } from 'services/tools/tools';

import ICommonViewModel from '../viewModels/ICommonViewModel';

import ICommonViewProps from './ICommonViewProps';
import IStyledViewProps from './IStyledViewProps';

import ICommonStyle from './ICommonStyle';
import defaultStyle from './CommonView.module.css';
import CommonButton from './CommonButton';

interface IModeViewProps extends IStyledViewProps {
    SelectedModeView: (props: IStyledViewProps) => JSX.Element;
}

const ModeView = ({ SelectedModeView, dataContext, styleContext }: IModeViewProps) => {
    return (
        <SelectedModeView dataContext={dataContext} styleContext={styleContext} />
    );
}

export default function CommonView({ dataContext, styleContext, modeViews }: ICommonViewProps) {

    const viewModel = dataContext() as ICommonViewModel;
    const style = mergeStyles(styleContext as ICommonStyle, defaultStyle);
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
                        <CommonButton style={style}
                            variant='add'
                            label='Add'
                            onClick={viewModel.addItem}
                            disabled={!viewModel.canAddItem} />
                        <CommonButton style={style}
                            variant='edit'
                            label='Edit'
                            onClick={viewModel.editItem}
                            disabled={!viewModel.canEditItem}/>
                        <CommonButton style={style}
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
                        styleContext={style}
                    />
                </div>
            </div>
        </div>
    );
}
