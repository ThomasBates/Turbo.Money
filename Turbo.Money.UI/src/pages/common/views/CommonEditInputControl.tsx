import ICommonStyle from "./ICommonStyle";

interface IProps {
    style: ICommonStyle;
    name: string;
    label: string;
    value?: string | string[] | number;
    isValid?: boolean;
    setProperty: (name: string, value: string | string[] | number) => void;
}

export default function CommonEditInputControl({ style, name, label, value, isValid, setProperty }: IProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.currentTarget;
        setProperty(name, value);
    }

    return (
        <tr>
            <td className={style.mode_label}>
                {label}
            </td>
            <td>
                <input
                    className={(isValid !== false) ? style.mode_control : style.mode_invalid_control}
                    type='text'
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            </td>
        </tr>
    )
}