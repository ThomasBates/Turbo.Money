import React from "react";

import BudgetWorksheetButton from "../components/BudgetWorksheetButton";

const BudgetWorksheetAccountView = ({ viewModel }) => {
    return (
        <>
            <tr className="tb-worksheet-row">
                <td></td>
                <td></td>
                <td>{viewModel.name}</td>
                <td className="text-warning text-end">{viewModel.amount}</td>
                <td>{viewModel.typeName}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetButton
                        type="delete"
                        placement="right"
                        tooltip="Delete this Budget Account"
                        onClick={viewModel.deleteAccount} />
                    <BudgetWorksheetButton
                        type="edit"
                        placement="right"
                        tooltip="Edit this Budget Account"
                        onClick={viewModel.editAccount} />
                    <BudgetWorksheetButton
                        type="show"
                        placement="right"
                        tooltip="Show Details of this Budget Account"
                        onClick={viewModel.showAccount} />
                </td>
            </tr>
        </>
    );
};

export default BudgetWorksheetAccountView;