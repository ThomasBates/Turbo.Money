
import ICommonStyle from "./ICommonStyle";

export default interface ICommonViewStyle extends ICommonStyle {

    main_form?: string;
    list_panel?: string;
    title?: string;

    enabled_unselected_list_item?: string;
    enabled_selected_list_item?: string;
    disabled_unselected_list_item?: string;
    disabled_selected_list_item?: string;

    button_panel?: string;
    add_button?: string;
    edit_button?: string;
    delete_button?: string;

    mode_panel?: string;
}