import React from "react";

function SocialLink({ icon, href }) {
    return (
        //<a className={`btn btn-dark tb-social-link bi-${icon}`} role="button" target="_blank" href={href} />
        <a className={`tb-social-link bi-${icon}`} target="_blank" href={href} />
    );
}

function SocialLinks({ className }) {
    return (
        <div className={"tb-social-links " + className}>
            <SocialLink icon="twitter-x" href="https://twitter.com/RoboTurbo2"/>
            <SocialLink icon="wordpress" href="https://turbobutterfly.wordpress.com/"/>
            <SocialLink icon="youtube"   href="https://www.youtube.com/@turbobutterfly1974/videos"/>
            <SocialLink icon="instagram" href="https://www.instagram.com/roboturbo2/"/>
            <SocialLink icon="facebook"  href="https://www.facebook.com/Turboflygames"/>
        </div>
    );
}

export default SocialLinks;