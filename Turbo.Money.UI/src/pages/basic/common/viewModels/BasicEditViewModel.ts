
import IBasicEditViewModel from './IBasicEditViewModel';
import IBasicModeViewModelProps from './IBasicModeViewModelProps';

export default function BasicEditViewModel(
    { title, entity, mode, item, setItem, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBasicEditViewModel {
    title = mode === "edit" ? `Edit ${title}:` : `Create New ${title}:`;
    const submitText = mode === 'edit' ? 'Update' : 'Create';

    const setProperty = (name: string, value: string | string[] | number) => {
        if (setItem && item)
            setItem({ ...item, [name]: value });
    };

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

        canSubmit: true,
        canCancel: true,

        setProperty,
        submit,
        cancel
    }
}
