
import ICommonStyle from "common/views/ICommonStyle";

import styleModule from './SocialLinks.module.css';

const style = styleModule as ICommonStyle;

interface ILinkProps {
    icon: string;
    href: string;
}

function SocialLink({ icon, href }: ILinkProps) {
    return (
        <a target="_blank" href={href} >
            <img className={style[icon]} />
        </a>
    );
}

interface IProps {
    className: string;
}

export default function SocialLinks({ className }: IProps) {
    return (
        <div className={className}>
            <SocialLink icon="twitterx"  href="https://twitter.com/RoboTurbo2"/>
            <SocialLink icon="wordpress" href="https://turbobutterfly.wordpress.com/"/>
            <SocialLink icon="youtube"   href="https://www.youtube.com/@turbobutterfly1974/videos"/>
            <SocialLink icon="instagram" href="https://www.instagram.com/roboturbo2/"/>
            <SocialLink icon="facebook"  href="https://www.facebook.com/Turboflygames"/>
        </div>
    );
}
