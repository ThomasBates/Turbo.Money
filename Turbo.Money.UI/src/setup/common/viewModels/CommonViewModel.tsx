import React, { useState, useEffect } from "react";

const CommonViewModel = (title, dataService, initialItem, detailsViewModel, editViewModel) => {
    const [list, setList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState("none");
    const [modeItemId, setModeItemId] = useState(null);
    const [modeItem, setModeItem] = useState(null);
    const [returnId, setReturnId] = useState(null);

    let dialogOpen = (mode === "add" || mode === "edit" || mode === "delete");
    let canSelectItem = !dialogOpen;
    let canAddItem = !dialogOpen;
    let canEditItem = (selectedIndex != null) && !dialogOpen;
    let canDeleteItem = canEditItem;

    useEffect(() => {
        retrieveAllItems();
    }, []);

    useEffect(() => {
        retrieveModeItem();
    }, [modeItemId]);

    const compareItems = (item1, item2) => {
        const name1 = item1.name.toUpperCase();
        const name2 = item2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    //  Data Service Methods

    const retrieveAllItems = () => {
        dataService.getList()
            .then(response => {
                console.log("retrieveAllItems: ", response.data);
                const newList = response.data.sort(compareItems);
                setList(newList);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveModeItem = () => {
        if (modeItemId) {
            dataService.get(modeItemId)
                .then(response => {
                    console.log("retrieveModeItem: ", response.data);
                    setModeItem(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            setModeItem(null);
        }
    };

    const createModeItem = async () => {
        try {
            const response = await dataService.create(modeItem);
            console.log("createItem: ", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const updateModeItem = async () => {
        try {
            const response = await dataService.update(modeItem.id, modeItem);
            console.log("updateCategory: ", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const deleteModeItem = async () => {
        try {
            const response = await dataService.remove(modeItem.id);
            console.log("deleteCategory: ", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const selectItem = (item) => {
        setModeItemId(item.id);
        setSelectedIndex(list.findIndex(b => b.id == item.id));
        setMode("details");
    };

    //  Mode Methods

    //  When the ADD button is clicked:
    //    - current item id is saved for later
    //    - selected index is cleared
    //    - item to be edited is set to initial values.
    //    - mode set to "add" to open ADD form.
    //  When the SUBMIT button is clicked:
    //    - new item id is saved for later.
    //    - insert the new item into the item list.
    //    - select the newly added item.
    //    - view item details
    //  When the CANCEL button is clicked:
    //    - select the previously selected item.
    //    - view item details
    const addItem = () => {
        setReturnId(modeItem ? modeItem.Id : null);
        setSelectedIndex(null);
        setModeItem(initialItem);
        setMode("add");
    };

    const onAddSubmitted = async () => {
        let createdItem = await createModeItem();

        setReturnId(createdItem.id);
        let newList = [...list, createdItem].sort(compareItems);
        setList(newList);
        selectItem(createdItem);
        setSelectedIndex(newList.findIndex(b => b.id == createdItem.id));
    };

    const onAddCancelled = () => {
        if (returnId) {
            const item = list.find(item => item.id == returnId);
            selectItem(item);
            setReturnId(null);
        }
        else {
            setMode("none");
        }
    };

    //  When the EDIT button is clicked:
    //    - selected item is not cleared.
    //    - item to be edited is already set from the selected item.
    //    - mode set to "edit" to open EDIT form.
    //  When the SUBMIT button is clicked:
    //    - update the item list from the edited item data.
    //    - select the edited item (should already be selected)
    //  When the CANCEL button is clicked:
    //    - select the previously selected item (should already be selected)
    //    - view item details
    const editItem = () => {
        setMode("edit");
    };

    const onEditSubmitted = async () => {
        let updatedItem = await updateModeItem();

        let newList = list.map(item => {
            if (item.id == updatedItem.id) {
                return updatedItem;
            }
            return item;
        }).sort(compareItems);
        setList(newList);

        selectItem(updatedItem);
        retrieveModeItem();
    };

    const onEditCancelled = () => {
        retrieveModeItem();
        setMode("details");
    };

    //  When the DELETE button is clicked:
    //    - selected item is not cleared.
    //    - item to be deleted is already set from the selected item.
    //    - mode set to "delete" to open DELETE form.
    //  When the SUBMIT button is clicked:
    //    - update the item list from the deleted item data.
    //    - unselect all items.
    //  When the CANCEL button is clicked:
    //    - select the previously selected item (should already be selected)
    //    - view item details
    const deleteItem = () => {
        setMode("delete");
    };

    const onDeleteSubmitted = async () => {
        let deletedItem = await deleteModeItem();

        let newList = list
            .filter(item => item.id != deletedItem.id)
            .sort(compareItems);
        setList(newList);

        setSelectedIndex(null);
        setMode("none");
    };

    const onDeleteCancelled = () => {
        setMode("details");
    };

    let modeViewModel = null;
    switch (mode) {
        case "details":
            modeViewModel = detailsViewModel({
                mode: mode,
                item: modeItem,
                onSubmitted: null,
                onCancelled: null,
            });
            break;
        case "add":
            modeViewModel = editViewModel({
                mode: mode,
                item: modeItem,
                setItem: setModeItem,
                list: list,
                onSubmitted: onAddSubmitted,
                onCancelled: onAddCancelled
            });
            break;
        case "edit":
            modeViewModel = editViewModel({
                mode: mode,
                item: modeItem,
                setItem: setModeItem,
                list: list,
                onSubmitted: onEditSubmitted,
                onCancelled: onEditCancelled
            });
            break;
        case "delete":
            modeViewModel = detailsViewModel({
                mode: mode,
                item: modeItem,
                onSubmitted: onDeleteSubmitted,
                onCancelled: onDeleteCancelled
            });
            break;
        default:
            modeViewModel = detailsViewModel({
                mode: mode,
                item: null,
                onSubmitted: null,
                onCancelled: null
            });
            break;
    }

    return {
        title,
        list,
        selectedIndex,
        mode,
        modeViewModel,

        canSelectItem,
        canAddItem,
        canEditItem,
        canDeleteItem,

        selectItem,
        addItem,
        editItem,
        deleteItem
    }
};

export default CommonViewModel;