import React from "react";

function SocialLink({ icon, href }) {
    return (
        <a className="tb-social-link" target="_blank" href={href} >
            <img src={`/assets/icons/icons8-${icon}-48.png`} alt={icon} width="24" />
        </a>
    );
}

export default function SocialLinks({ className }) {
    return (
        <div className={"tb-social-links " + className}>
            <SocialLink icon="twitterx"  href="https://twitter.com/RoboTurbo2"/>
            <SocialLink icon="wordpress" href="https://turbobutterfly.wordpress.com/"/>
            <SocialLink icon="youtube"   href="https://www.youtube.com/@turbobutterfly1974/videos"/>
            <SocialLink icon="instagram" href="https://www.instagram.com/roboturbo2/"/>
            <SocialLink icon="facebook"  href="https://www.facebook.com/Turboflygames"/>
        </div>
    );
}
