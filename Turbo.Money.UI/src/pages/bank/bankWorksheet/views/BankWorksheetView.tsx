import { useEffect, useState } from "react";

import Modal from 'components/modal/Modal';

import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";
import IViewFactoryProps from "pages/common/views/IViewFactoryProps";

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
import IBankWorksheetStyle from "./IBankWorksheetStyle";

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
}

const ModeView = ({ modeViewModel }: IModeViewProps) => {
    const SelectedModeView = modeViews[modeViewModel.entity][modeViewModel.mode];
    return (
        <SelectedModeView dataContext={modeViewModel} />
    );
}

export default function BankWorksheetView({ dataContext }: IViewFactoryProps) {

    const viewModel = dataContext() as IBankWorksheetViewModel;
    const style = styleContext as IBankWorksheetStyle;

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
                <Modal >
                    <ModeView modeViewModel={viewModel.modeViewModel} />
                </Modal>
            }
        </>
    );
}
