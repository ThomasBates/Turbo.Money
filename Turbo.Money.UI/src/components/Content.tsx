import React from "react";

import SideBar from './SideBar';
import RoutesPanel from './RoutesPanel';

function Content() {
    return (
        <div className="tb-content">
            <SideBar />
            <RoutesPanel />
        </div>
    );
}

export default Content;