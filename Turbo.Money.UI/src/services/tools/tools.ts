
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

export function formatCurrency(number: number) {
    const value = Number(number);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return localeFormat.format(value);
};

export function formatDate(date: string) {
    const value = new Date(date);
    const tzMin = value.getTimezoneOffset();
    value.setTime(value.getTime() + (tzMin*60*1000));

    return value.toLocaleDateString();

    //const localeFormat = new Intl.DateTimeFormat('en-US', {
    //    dateStyle: 'long',
    //    //timeStyle: 'long',
    //    //timeZone: 'GMT-6',
    //    //timeZoneName: 'long',
    //});

    //return localeFormat.format(value);
}
