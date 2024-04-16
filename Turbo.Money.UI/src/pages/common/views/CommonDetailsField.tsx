
import ICommonStyle from 'pages/common/views/ICommonStyle';

interface ICommonDetailsFieldProps {
    style: ICommonStyle;
    label: string;
    value: string;
}

export default function CommonDetailsField({ style, label, value }: ICommonDetailsFieldProps) {
    return (
        <tr className={style.mode_row}>
            <td className={style.mode_label}>{label}</td>
            <td className={style.mode_value}>{value}</td>
        </tr>
    );
}
