
export default function CommonEditViewModel(title, entity, mode, item, setItem, onSubmitted, onCancelled) {
    title = mode === "edit" ? `Edit ${title}:` : `Add ${title}:`;

    const setProperty = (name, value) => {
        setItem({ ...item, [name]: value });
    };

    const submit = () => {
        onSubmitted(item);
    }

    const cancel = () => {
        onCancelled(item);
    };

    return {
        title,
        entity,
        mode,
        item,

        setProperty,
        submit,
        cancel
    }
};
