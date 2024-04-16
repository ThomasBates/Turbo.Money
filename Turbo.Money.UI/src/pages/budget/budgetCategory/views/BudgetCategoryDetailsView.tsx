
import CommonDetailsField from 'pages/common/views/CommonDetailsField';
import CommonDetailsView from 'pages/common/views/CommonDetailsView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetCategoryDetailsViewModel from '../viewModels/IBudgetCategoryDetailsViewModel';

export default function BankDetailsView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetCategoryDetailsViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonDetailsView dataContext={dataContext} styleContext={styleContext}>
            {viewModel.showDetails && <>
                <CommonDetailsField style={style} label="Section" value={viewModel.sectionName} />
                <CommonDetailsField style={style} label="Category Name" value={viewModel.category.name} />
                <CommonDetailsField style={style} label="Description" value={viewModel.category.description} />
            </>}
        </CommonDetailsView>
    );
}
