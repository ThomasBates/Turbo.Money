import React from "react";

import Table from 'react-bootstrap/Table';

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";

export default ({ viewModel }) => {
    viewModel = viewModel();
    return (
        <div className="app">
            <h1>{viewModel.title}</h1>
            <Table size="sm" variant="dark" responsive borderless>
                {/*
                <thead>
                    <tr>
                        <th colSpan={3}>Account</th>
                        <th className="text-end">Amount</th>
                        <th></th>
                        <th>Description</th>
                    </tr>
                </thead>
                */}
                <tbody>
                    {viewModel.sectionViewModels &&
                        viewModel.sectionViewModels.map(vm => (
                            <BudgetWorksheetSectionView key={vm.name} viewModel={vm} />
                        ))}
                </tbody>
            </Table>
        </div>
    );
};
