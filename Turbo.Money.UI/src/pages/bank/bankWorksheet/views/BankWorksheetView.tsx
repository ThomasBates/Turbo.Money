import { useEffect, useState } from "react";

import Modal from 'controls/modal/Modal';

import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";
import IFactoryViewProps from "pages/common/views/IFactoryViewProps";

import commonStyleModule from 'pages/common/views/CommonView.module.css';
import BankBankDetailsView from "pages/bank/bankBank/views/BankBankDetailsView";
import BankBankEditView from "pages/bank/bankBank/views/BankBankEditView";
import BankAccountDetailsView from "pages/bank/bankAccount/views/BankAccountDetailsView";
import BankAccountEditView from "pages/bank/bankAccount/views/BankAccountEditView";

import BankWorksheetMenu from '../components/BankWorksheetMenu';

import IBankWorksheetViewModel from "../viewModels/IBankWorksheetViewModel";

import BankWorksheetBankView from "./BankWorksheetBankView";

import styleContext from "./BankWorksheet.module.css";
import IBankWorksheetBankViewModel from "../viewModels/IBankWorksheetBankViewModel";
import IBankWorksheetModeViews from "./IBankWorksheetModeViews";
import ICommonStyle from "../../../common/views/ICommonStyle";

const modeViews: Record<string, IBankWorksheetModeViews> = {
    BankBank: {
        add: BankBankEditView,
        edit: BankBankEditView,
        show: BankBankDetailsView,
        delete: BankBankDetailsView,
    },
    BankAccount: {
        add: BankAccountEditView,
        edit: BankAccountEditView,
        show: BankAccountDetailsView,
        delete: BankAccountDetailsView,
    }
}

interface IModeViewProps {
    modeViewModel: ICommonModeViewModel;
    style: ICommonStyle;
}

const ModeView = ({ modeViewModel, style }: IModeViewProps) => {
    const SelectedModeView = modeViews[modeViewModel.entity][modeViewModel.mode];
    return (
        <SelectedModeView dataContext={modeViewModel} styleContext={style} />
    );
}

export default function BankWorksheetView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IBankWorksheetViewModel;
    const style = styleContext as ICommonStyle;
    const commonStyle = commonStyleModule as ICommonStyle;

    useEffect(() => {
        viewModel.loadBankData();
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Bank Actions",
        list: [
            { action: viewModel.loadBankData, icon: "load_icon", content: "Reload bank data", },
            { action: viewModel.saveBankData, icon: "save_icon", content: "Save bank data",},
            { action: viewModel.addBank, icon: "add_icon", content: "Create new bank", },
        ]
    };

    return (
        <>
            <div>
                <table className={style.table}> 
                    <tbody>
                        <tr>
                            <td colSpan={5} className={style.title}><h1>{viewModel.title}</h1></td>
                        </tr>
                        <tr>
                            <td colSpan={4}></td>
                            <td className={style.buttons}>
                                <BankWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>

                        {viewModel.bankViewModels &&
                            viewModel.bankViewModels.map((viewModel: IBankWorksheetBankViewModel) => (
                                <BankWorksheetBankView
                                    key={viewModel.name}
                                    dataContext={viewModel}
                                    styleContext={style} />
                            ))
                        }

                        <tr>
                            <td colSpan={4}></td>
                            <td className={style.buttons}>
                                <BankWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {viewModel.modeViewModel &&
                <Modal className={style.modal_theme}>
                    <ModeView modeViewModel={viewModel.modeViewModel} style={commonStyle} />
                </Modal>
            }
        </>
    );
}
