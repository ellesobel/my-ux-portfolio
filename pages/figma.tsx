//figma projects

import Image from "next/image";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect } from "react";


function Figma() {
    useEffect(() => {
        const videos = document.querySelectorAll<HTMLVideoElement>('.app-video');

        videos.forEach(video => {
            video.addEventListener('click', () => {
                video.paused ? video.play() : video.pause();
            });
        });

        return () => {
            videos.forEach(video => {
                video.replaceWith(video.cloneNode(true));
            });
        };
    }, []);


    return (
        <div className="page">
            <h2 className="page-title">Eliana&#39;s Figma Projects</h2>
            <h3>I created these interactive mobile app prototypes using Figma.</h3>
            <ol>
                <h3>Tip: Click the phone screens to watch demos of the apps!</h3>
            </ol>
            <section className="projects">
                <div id="brainchip" className="project">
                    <div className="title-and-link">
                        <h3>Brainchip App</h3>
                        <a
                            href="https://www.figma.com/proto/46t8dpPe2OMCsJ1bUQukFd/AVPS--Project-3?page-id=0%3A1&node-id=65-209&starting-point-node-id=65%3A209&t=mgNhD8pfZTfOgzaY-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Prototype <OpenInNewIcon />
                        </a>
                    </div>
                    <div className="text-and-content">
                    <ul>
                        <li>Inspired by <em>Neuralink</em> and <em>Black Mirror</em>, I visualized an assistant app for what a possible user experience might look like for a dystopian government-mandated thought-surveillance system.</li>
                        <li>I developed a design system featuring bright/pastel colors and cute animations to make users forget about the invasiveness of the app.</li>
                        <li>I prototyped a landing page, settings page, and 3 main features: dream recap, mood analyzer, and friend location tracking.</li>
                        <li>Throughout the app, there is subtle sponsorships, because capitalism, yknow? </li>
                    </ul>
                    {/* Insert images of prototype */}
                    <div className="video-align">
                        <div className="video-crop">
                            <video
                                className="app-video"
                                id="brainchip-demo"
                                width={1920}
                                height={1140}
                                // autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/images/brainchip_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    </div>

                </div>
                <div id="music-app" className="project">
                    <div className="title-and-link">
                        <h3>Music Map App</h3>
                        <a
                            href="https://www.figma.com/proto/2VKtHdxEqOimViafopvew0/Eliana-Semester-Second-Half?page-id=1%3A2&node-id=295-1989&starting-point-node-id=295%3A1989&show-proto-sidebar=1&t=6mWFIjEwga52zpoi-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Prototype <OpenInNewIcon />
                        </a>
                    </div>
                    <div className="text-and-content">

                    <ul>
                        <li>This app has 3 different flows to let the user choose a destination based on lyrics from a song about New York City.</li>
                        <li>I developed a design system featuring custom neon light accents and arrows.</li>
                        <li>I utilized wireframing and conducted user testing for this project.</li>
                    </ul>
                    {/* Insert images of prototype */}
                    <div className="video-align">
                        <div className="video-crop">
                            <video
                                className="app-video"
                                id="music-map-demo"
                                width={1920}
                                height={1140}
                                // autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/images/music_map_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    </div>
                    {/* <div className="app-photos">
                        <Image className="app-img"
                            src="/images/music_app_1.avif"
                            alt="Music App prototype 1"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/music_app_2.avif"
                            alt="Music App prototype 2"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/music_app_3.avif"
                            alt="Music App prototype 3"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/music_app_4.avif"
                            alt="Music App prototype 4"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/music_app_5.avif"
                            alt="Music App prototype 5"
                            width={196}
                            height={400}
                        />
                    </div> */}
                </div>
                <div id="pnc-redesign" className="project">
                    <div className="title-and-link">

                        <h3>PNC Redesign</h3>
                        <a
                            href="https://www.figma.com/proto/0GMLwccmcJZDvUO3ao0gNo/Project-1---Datafied-Experiences---Prototyping--Copy-?page-id=432%3A351&node-id=649-2176&viewport=-9480%2C1435%2C0.65&t=jJAkwCWn8aXjERSs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=649%3A474"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Prototype <OpenInNewIcon />
                        </a>
                    </div>
                    <div className="text-and-content">

                    <ul>
                        <li>
                            In collaboration with Andrew Pandji and Gabrielle Barthelmy, we redesigned the PNC Mobile App.
                        </li>
                        <li>
                            We created a new design system, explored different visualizations of data, and enhanced the accessibility of the app.
                        </li>
                        {/* For the watchface design, we explored goals and miniaturized data visualization. */}
                    </ul>

                    {/* Insert images of prototype */}
                    {/* <Image src="/images/pnc-redesign.png" alt="PNC Redesign prototype" 
                            fill 
                            style={{ objectFit: "cover" }} /> */}
                    
                    <div className="video-align">
                        <div className="video-crop">
                            <video
                                className="app-video"
                                id="pnc-demo"
                                width={1920}
                                height={1140}
                                // autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/images/pnc_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    </div>
                    <div>
                        <Image className="web-view" id="design-system"
                            src="/images/pnc_design_system.png"
                            alt="PNC App Design System"
                            width={1207 / 2}
                            height={671 / 2}
                        />
                    </div>
                    {/* <div className="app-photos">

                        <Image className="app-img"
                            src="/images/pnc_app_1.png"
                            alt="PNC App prototype 1"
                            width={196}
                            height={400}
                        />  <Image className="app-img"
                            src="/images/pnc_app_2.png"
                            alt="PNC App prototype 2"
                            width={196}
                            height={400}
                        />  <Image className="app-img"
                            src="/images/pnc_app_3.png"
                            alt="PNC App prototype 3"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/pnc_app_4.png"
                            alt="PNC App prototype 4"
                            width={196}
                            height={400}
                        />  <Image className="app-img"
                            src="/images/pnc_app_5.png"
                            alt="PNC App prototype 5"
                            width={196}
                            height={400}
                        />
                    </div> */}

                </div>
                {/* <div id="emissions-app" className="project"> */}
                {/* <div className="title-and-link">

                        <h3>CO2 Emissions App</h3>
                        <a
                            href="https://www.figma.com/proto/2VKtHdxEqOimViafopvew0/Eliana-Semester-Second-Half?page-id=0%3A1&node-id=157-2850&starting-point-node-id=157%3A2850&show-proto-sidebar=1&t=IHWeVHMJ6jMLMY6N-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Prototype <OpenInNewIcon />
                        </a>
                    </div> */}
                {/* <p>I created this interactive mobile app prototype using Figma.
                        It features 2 different designs to read per capita CO2 emission data, as affected by international events.
                        I utilized wireframing and conducted user testing for this project.
                    </p> */}

                {/* Insert images of prototype */}

                {/* <div className="app-photos">
                        <Image className="app-img"
                            src="/images/emissions_1.png"
                            alt="CO2 Emissions App prototype 1"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/emissions_2.png"
                            alt="CO2 Emissions App prototype 2"
                            width={196}
                            height={400}
                        />
                        <Image className="app-img"
                            src="/images/emissions_3.png"
                            alt="CO2 Emissions App prototype 3"
                            width={196}
                            height={400}
                        />
                    </div>
                </div> */}
                {/* <div id="picky-site" className="project"> */}
                {/* <h3>Picky Eater Site</h3>
                    <p>I designed this interactive site protype using Figma.
                        It is an exhibit of all of the weird foods I don&#39;t eat, as a recovering picky eater.
                        I utilized wireframing and conducted user testing for this project.
                    </p>
                    <a
                        href="go-find-it"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Access Prototype
                    </a>

                    /* Insert images of prototype */
                    /* <Image src="/images/picky-site.png" alt="Picky Eater Site prototype" 
                            fill 
                            style={{ objectFit: "cover" }}/> */}
                {/* </div> */}
            </section>
        </div>
    );
}

export default Figma;