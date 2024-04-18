
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import IBudgetCategoryDetailsViewModel from '../viewModels/IBudgetCategoryDetailsViewModel';

export default function BankDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetCategoryDetailsViewModel;

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && <>
                <BasicDetailsField style={style} label="Section" value={viewModel.sectionName} />
                <BasicDetailsField style={style} label="Category Name" value={viewModel.category.name} />
                <BasicDetailsField style={style} label="Description" value={viewModel.category.description} />
            </>}
        </BasicDetailsView>
    );
}
