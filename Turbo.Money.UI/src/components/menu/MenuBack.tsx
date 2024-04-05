
export default function MenuBack({ style, item, onListSelected }) {
    const isText = (typeof item.content === 'string');
    const className = isText ? style.item : style.logo;
    const iconClass = isText ? `bi-caret-left-fill ${style.back_icon_color}` : "";

    const handleClick = () => {
        if (onListSelected) {
            onListSelected(item);
        }
    }

    return (
        <div
            className={className}
            key={item.content}
            onClick={handleClick}
            data-value={item.content}
        >
            <span className={iconClass} />{item.content}
        </div>
    );
}
