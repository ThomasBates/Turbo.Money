import React from "react";

const Link = require("react-router-dom").Link;

function SettingLink({ icon, href }) {
    return (
        //<a className={`btn btn-dark tb-social-link bi-${icon}`} role="button" target="_blank" href={href} />
        <a className={`tb-settings-link bi-${icon}`} target="_blank" href={href} />
    );
}

function Settings({ className}) {
    return (
        <div className={"tb-settings " + className}>
            <SettingLink icon="person-fill"         href=""/>
            <SettingLink icon="three-dots-vertical" href=""/>
        </div>
    );
}

export default Settings;