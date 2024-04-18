
import IBasicDetailsViewModel from './IBasicDetailsViewModel';
import IBasicModeViewModelProps from './IBasicModeViewModelProps';

export default function BasicDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBasicDetailsViewModel {
    title = mode === "delete" ? `Delete ${title}:` : `${title} Details:`;
    const submitText = 'Delete';

    const notSelected = `No ${title} selected`
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
        submitText,
        item,

        notSelected,
        showDetails,
        showButtons,
        showOKButton,

        canSubmit: true,
        canCancel: true,

        submit,
        cancel
    };
}
