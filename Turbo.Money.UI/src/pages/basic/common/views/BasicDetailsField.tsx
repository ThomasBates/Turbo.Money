
import ICommonStyle from 'common/views/ICommonStyle';

interface IBasicDetailsFieldProps {
    style: ICommonStyle;
    label: string;
    value: string;
}

export default function BasicDetailsField({ style, label, value }: IBasicDetailsFieldProps) {
    return (
        <tr className={style.mode_row}>
            <td className={style.mode_label}>{label}</td>
            <td className={style.mode_value}>{value}</td>
        </tr>
    );
}
