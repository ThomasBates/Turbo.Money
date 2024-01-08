declare var require: any
var React = require('react');

function SocialLinks() {
    return (
        <div>
            <a className="btn btn-dark" role="button" target="_blank" href="https://twitter.com/RoboTurbo2">X</a>
            <a className="btn btn-dark" role="button" target="_blank" href="https://turbobutterfly.wordpress.com/">W</a>
            <a className="btn btn-dark" role="button" target="_blank" href="https://www.youtube.com/@turbobutterfly1974/videos">&gt;</a>
            <a className="btn btn-dark" role="button" target="_blank" href="https://www.instagram.com/roboturbo2/">o</a>
            <a className="btn btn-dark" role="button" target="_blank" href="https://www.facebook.com/Turboflygames">f</a>
        </div>
    );
}

export default SocialLinks;