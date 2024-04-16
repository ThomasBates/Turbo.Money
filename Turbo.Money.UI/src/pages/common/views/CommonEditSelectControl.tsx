import ICommonItem from "../../../models/common/ICommonItem";
import ICommonStyle from "./ICommonStyle";

interface IProps {
    style: ICommonStyle;
    name: string;
    label: string;
    value?: string | string[] | number;
    isValid?: boolean;
    options: ICommonItem[] | {value:string,text:string}[];
    defaultOption?: string;
    setProperty: (name: string, value: string | string[] | number) => void;
}

export default function CommonEditSelectControl({ style, name, label, value, isValid, options, defaultOption, setProperty }: IProps) {

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const { name, value } = event.currentTarget;
        setProperty(name, value);
    }

    return (
        <tr>
            <td className={style.mode_label}>
                {label}
            </td>
            <td className={(isValid !== false) ? style.mode_control : style.mode_invalid_control}>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    {defaultOption &&
                        <option value="0" key="0">
                            {defaultOption}
                        </option>}
                    {options.map(optionItem => {
                        if ('id' in optionItem) {
                            return (
                                <option value={optionItem.id} key={optionItem.id} >
                                    {optionItem.name}
                                </option>
                            )
                        }
                        return (
                            <option value={optionItem.value} key={optionItem.value} >
                                {optionItem.text}
                            </option>
                        )
                    })}
                </select>
            </td>
        </tr>
    )
}