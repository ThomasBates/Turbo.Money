import React from "react";

import SocialLinks from './SocialLinks';
import Settings from './Settings';

function Header() {
    const test = 78;
    const title = "It's My Money";

    return (
        <div className="tb-header" >
            <span className="tb-header-left">{`${title} (${test})`}</span>
            {/*
            <SocialLinks className="tb-header-left" />
            <h1 className="tb-header-text-mobile">{`${title} (mobile) (${test})`}</h1>
            <h1 className="tb-header-text-desktop">{`${title} (desktop) (${test})`}</h1>
            */}
            <Settings className={"tb-header-right"} />
        </div>
    );
}

export default Header;