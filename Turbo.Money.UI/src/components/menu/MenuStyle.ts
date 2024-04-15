
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

    return compositeStyle;
    /*
    return {
        root_control: customStyle.root_control || typedDefaultStyle.root_control,
        root_theme: customStyle.root_theme || typedDefaultStyle.root_theme,
        root_icon: customStyle.root_icon || typedDefaultStyle.root_icon,

        list_control: customStyle.list_control || typedDefaultStyle.list_control,
        list_position_top: customStyle.list_position_top || typedDefaultStyle.list_position_top,
        list_position_right: customStyle.list_position_right || typedDefaultStyle.list_position_right,
        list_position_left: customStyle.list_position_left || typedDefaultStyle.list_position_left,
        list_position_below: customStyle.list_position_below || typedDefaultStyle.list_position_below,
        list_theme: customStyle.list_theme || typedDefaultStyle.list_theme,
        list_top_icon: customStyle.list_top_icon || typedDefaultStyle.list_top_icon,
        list_top_disabled_icon: customStyle.list_top_disabled_icon || typedDefaultStyle.list_top_disabled_icon,
        list_sub_icon: customStyle.list_sub_icon || typedDefaultStyle.list_sub_icon,
        list_sub_disabled_icon: customStyle.list_sub_disabled_icon || typedDefaultStyle.list_sub_disabled_icon,
        list_content: customStyle.list_content || typedDefaultStyle.list_content,
        list_disabled_content: customStyle.list_disabled_content || typedDefaultStyle.list_disabled_content,

        item_control: customStyle.item_control || typedDefaultStyle.item_control,
        item_theme: customStyle.item_theme || typedDefaultStyle.item_theme,
        disabled_item_control: customStyle.disabled_item_control || typedDefaultStyle.disabled_item_control,
        disabled_item_theme: customStyle.disabled_item_theme || typedDefaultStyle.disabled_item_theme,

        back_icon: customStyle.back_icon || typedDefaultStyle.back_icon,
        back_content: customStyle.back_content || typedDefaultStyle.back_content,

        link_icon: customStyle.link_icon || typedDefaultStyle.link_icon,
        link_action_icon: customStyle.link_action_icon || typedDefaultStyle.link_action_icon,
        link_disabled_icon: customStyle.link_disabled_icon || typedDefaultStyle.link_disabled_icon,
        link_disabled_action_icon: customStyle.link_disabled_action_icon || typedDefaultStyle.link_disabled_action_icon,
        link_content: customStyle.link_content || typedDefaultStyle.link_content,
        link_disabled_content: customStyle.link_disabled_content || typedDefaultStyle.link_disabled_content,

        text_control: customStyle.text_control || typedDefaultStyle.text_control,
        text_theme: customStyle.text_theme || typedDefaultStyle.text_theme,
        divider_control: customStyle.divider_control || typedDefaultStyle.divider_control,
        divider_theme: customStyle.divider_theme || typedDefaultStyle.divider_theme,
        text_icon: customStyle.text_icon || typedDefaultStyle.text_icon,
        text_content: customStyle.text_content || typedDefaultStyle.text_content,
    }
    */
}