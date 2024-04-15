
import IMenuStyle from "./IMenuStyle";
import defaultStyle from './Menu.module.css';

export default function MenuStyle(customStyle: IMenuStyle): IMenuStyle {

    const typedDefaultStyle = defaultStyle as IMenuStyle;

    const compositeStyle: IMenuStyle = {}
    for (const key in defaultStyle) {
        if (key in customStyle)
            compositeStyle[key] = customStyle[key];
        else
            compositeStyle[key] = typedDefaultStyle[key];
    }

    for (const key in customStyle) {
        if (!(key in defaultStyle))
            compositeStyle[key] = customStyle[key];
    }

    return compositeStyle;
}