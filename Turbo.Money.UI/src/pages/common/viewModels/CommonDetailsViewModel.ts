
import ICommonDetailsViewModel from './ICommonDetailsViewModel';
import ICommonModeViewModelProps from './ICommonModeViewModelProps';

export default function CommonDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: ICommonModeViewModelProps
): ICommonDetailsViewModel {

    title = mode === "delete" ? `Delete ${title}:` : `${title} Details:`;
    const showDetails = !!(item && item.id);
    const showButtons = (mode === "delete");
    const showOKButton = (mode === "show");

    const submit = () => {
        if (onSubmitted && item)
            onSubmitted(item);
    }

    const cancel = () => {
        if (onCancelled && item)
            onCancelled(item);
    };

    return {
        title,
        entity,
        mode,
        item,

        showDetails,
        showButtons,
        showOKButton,

        canSubmit: true,
        canCancel: true,

        submit,
        cancel
    };
}
