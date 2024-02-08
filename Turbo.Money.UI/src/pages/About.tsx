import React, { useEffect, useState } from "react";

function About() {

    const [dimensions, setDimensions] = useState(`${window.innerWidth}x${window.innerHeight}`);

    useEffect(() => {
        window.addEventListener('resize',
            () => setDimensions(`${window.innerWidth}x${window.innerHeight}`));
    }, []);

    return (
        <div className="tb-about" >
            <h1>It's My Money</h1>
            <h3>Development:</h3>
            <p>Front-end: JavaScript, React, Axios<br /></p>
            <p>Middle-end: Node.js, Express, Sequelize<br /></p>
            <p>Back-end: MySQL (mariadb)<br /></p>
            <h3>Device:</h3>
            <p>{dimensions}<br/></p>
            <p className="test-size-0">    0 -  320: nothing<br /></p>
            <p className="test-size-1">  321 -  480: smartphones, iPhone, portrait 480x320 phones<br/></p>
            <p className="test-size-2">  481 -  640: portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide<br/></p>
            <p className="test-size-3">  641 -  960: portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones<br/></p>
            <p className="test-size-4">  961 - 1024: tablet, landscape iPad, lo-res laptops ands desktops<br/></p>
            <p className="test-size-5"> 1025 - 1280: big landscape tablets, laptops, and desktops<br/></p>
            <p className="test-size-6"> 1281 - 2000: hi-res laptops and desktops<br /></p>

            <p className="test-hover-0">Does not support hover<br/></p>
            <p className="test-hover-1">Supports hover<br/></p>

            <p className="test-pointer-0">no pointer<br /></p>
            <p className="test-pointer-1">coarse pointer<br /></p>
            <p className="test-pointer-2">fine pointer<br /></p>
        </div>
    );
}

export default About;