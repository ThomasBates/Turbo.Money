import React from "react";

import SideBar from './SideBar';
import RoutesPanel from './RoutesPanel';

function Content({ navData }) {
    return (
        <div className="tb-content">
            <SideBar />
            <RoutesPanel navData={navData} />
        </div>
    );
}

export default Content;