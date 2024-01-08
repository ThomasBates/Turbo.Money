import React, { useState} from 'react';

interface Props {
    items: string[];
    heading: string;
    onItemSelected: (item: string) => void;
}

function ListGroup({ items, heading, onItemSelected }: Props) {

    const [selectedIndex, setSelectedIndex] = useState(-1);

    //if (cities.length === 0)
    //    return <p>No cities found</p>

    const handleClick = (event: MouseEvent) => {
        console.log(event);
    }

    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li className={index === selectedIndex ? "list-group-item active" : "list-group-item"}
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onItemSelected(item);
                        }}>
                        {item}
                    </li>))}
            </ul>
        </>
    );
}

export default ListGroup;