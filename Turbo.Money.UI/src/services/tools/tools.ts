
import ICommonStyle from "common/views/ICommonStyle";

export function getRandomString(size: number) {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < size; ++i) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}

export function mergeStyles(customStyle: ICommonStyle | undefined, defaultStyle: ICommonStyle | undefined): ICommonStyle {
    if (!customStyle)
        return defaultStyle || {};
    if (!defaultStyle)
        return customStyle;

    const mergedStyle: ICommonStyle = {}

    for (const key in defaultStyle) {
        if (key in customStyle)
            mergedStyle[key] = customStyle[key];
        else
            mergedStyle[key] = defaultStyle[key];
    }

    for (const key in customStyle) {
        if (!(key in defaultStyle))
            mergedStyle[key] = customStyle[key];
    }

    return mergedStyle;
}

export function combineStyles(...args: (string | undefined)[]): string {
    return args.filter(arg => arg != undefined).join(" ");
}
