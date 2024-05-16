
export default interface IModelItem {
    id: number;
    name: string;

    [key: string]: string | string[] | number | boolean | Date;
}

export function compareItems(item1: IModelItem, item2: IModelItem) {
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