
import ICommonStyle from "../../pages/common/views/ICommonStyle"

export default interface IMenuStyle extends ICommonStyle {
    root_control?: string
    root_theme?: string
    root_icon?: string

    list_control?: string
    list_position_top?: string
    list_position_right?: string
    list_position_left?: string
    list_position_below?: string
    list_theme?: string
    list_top_icon?: string
    list_top_disabled_icon?: string
    list_sub_icon?: string
    list_sub_disabled_icon?: string
    list_content?: string
    list_disabled_content?: string

    item_control?: string
    item_theme?: string
    disabled_item_control?: string
    disabled_item_theme?: string

    back_icon?: string
    back_content?: string

    link_icon?: string
    link_action_icon?: string
    link_disabled_icon?: string
    link_disabled_action_icon?: string
    link_content?: string
    link_disabled_content?: string

    text_control?: string
    text_theme?: string
    divider_control?: string
    divider_theme?: string
    text_icon?: string
    text_content?: string
}
