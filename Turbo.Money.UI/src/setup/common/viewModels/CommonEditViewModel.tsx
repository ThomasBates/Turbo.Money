import React from "react";

export default (title, mode, item, setItem, onSubmitted, onCancelled) => {
    title = mode === "edit" ? `Edit ${title}:` : `Add ${title}:`;

    const setProperty = (name, value) => {
        setItem({ ...item, [name]: value });
    };

    const submit = () => {
        onSubmitted();
    }

    const cancel = () => {
        onCancelled();
    };

    return {
        mode,
        title,
        item,

        setProperty,
        submit,
        cancel
    }
};
