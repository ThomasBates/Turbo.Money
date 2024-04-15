/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface ICommonItem {
    id: number;
    name: string;

    [key: string]: any;
}

export function compareItems(item1: ICommonItem, item2: ICommonItem) {
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