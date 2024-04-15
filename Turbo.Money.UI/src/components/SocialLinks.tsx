
interface ILinkProps {
    icon: string;
    href: string;
}

function SocialLink({ icon, href }: ILinkProps) {
    return (
        <a className="tb-social-link" target="_blank" href={href} >
            <img src={`/assets/icons/logos/${icon}.png`} alt={icon} width="24" />
        </a>
    );
}

interface IProps {
    className: string;
}

export default function SocialLinks({ className }: IProps) {
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
