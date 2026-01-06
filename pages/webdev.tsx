//web dev projects

import Image from "next/image";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect } from "react";

function webdev() {
    useEffect(() => {
        const videos = document.querySelectorAll<HTMLVideoElement>('.video');

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
            <h2 className="page-title">Eliana&#39;s Web Dev Projects</h2>
            <h3 className="page-subtitle">I created these applications using VSCode.</h3>
            <h3 id="tooltip">Tip: Click the screens to watch demos!</h3>
            <section className="projects">
                <div id="plant-log" className="project">
                    <div className="title-and-link">
                        <h3>Plant Log</h3>
                        <a
                            href="https://wustl-cse204a-sp2025-1.github.io/final-project-ellesobel/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Site <OpenInNewIcon />
                        </a>
                    </div>

                    <ul>
                        <li>This is a plant log I created using JavaScript, React, and the Perenual API.</li>
                        <li>Search up plants and add them to your garden with acquisition dates and personal notes.</li>
                        <li>Flip the plant cards to learn more about them, and click learn more to see a description quick facts.</li>
                        <li>When your plant dies, add it to the graveyard.</li>
                        <li>The site is flexible for all screen sizes &gt;375px.</li>
                    </ul>
                    <div className="web-view">
                        <div className="web-video-crop">
                            <video
                                className="video"
                                id="plant-web-demo"
                                width={1920}
                                height={1140}
                                // autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/images/plant_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div id="image-gallery" className="project">
                    <div className="title-and-link">
                        <h3>Image Gallery</h3>
                        <a
                            href="https://wustl-cse204a-sp2025-1.github.io/image-gallery-ellesobel/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Site <OpenInNewIcon />
                        </a>
                    </div>
                    <div className="text-and-content">
                        <div>
                            <ul>
                                <li>I created an interactive flower-fact image gallery website using HTML, CSS, and JavaScript.</li>
                                <li>The site features a modal.</li>
                                <li>The app is flexible for all screen sizes &gt;375px.</li>
                            </ul>
                            <div className="web-view">
                                <div className="web-video-crop">
                                    <video
                                        className="video"
                                        id="gallery-web-demo"
                                        width={1920}
                                        height={1140}
                                        // autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/images/gallery_web_demo.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>

                        {/* Insert images of prototype */}
                        <div className="web-photos">
                            <div className="mobile-view">

                                <div className="video-crop" id="gm-crop">
                                    <video
                                        className="video"
                                        id="gallery-mobile-demo"
                                        width={1920}
                                        height={1140}
                                        // autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/images/gallery_mobile_demo.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div id="brand-redesign" className="project">
                    <div className="title-and-link">
                        <h3>Brand Redesign</h3>
                        <a
                            href="https://wustl-cse204a-sp2025-1.github.io/brand-redesign-ellesobel/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Access Site <OpenInNewIcon/>
                        </a>
                    </div>
                    <p>
                        Revitalized the restaurant&#39;s visual identity, designing a modern logo, color palette, typography, and menu layout.
                        Applied core design principles like hierarchy, balance, and consistency to create a cohesive, professional, and inviting brand experience.
                        I used HTML and CSS for this redesign.
                    </p> */}
                {/* Insert images of prototype */}
                {/* <div className="web-photos">
                        <div className="web-view">
                            <Image className="app-img"
                                src="/images/brand_1.png"
                                alt="Brand Redesign 1"
                                width={575}
                                height={400}
                            />
                            <Image className="app-img"
                                src="/images/brand_2.png"
                                alt="Brand Redesign 2"

                                width={575}
                                height={400}
                            />
                        </div>
                        <div className="mobile-view">
                            <Image className="app-img"
                                src="/images/brand_3.png"
                                alt="Brand Redesign Mobile 1"

                                width={225}
                                height={400}
                            />
                            <Image className="app-img"
                                src="/images/brand_4.png"
                                alt="Brand Redesign Mobile 2"

                                width={225}
                                height={400}
                            />
                        </div>
                    </div>
                </div> */}
                {/* <div id="ticketing-site"> */}
                {/* <h3>Chivent - Ticketing Web App</h3>
                    <p>
                        A React-based prototype where users can browse and purchase tickets, powered by my custom API through MongoDB.
                    </p>
                    <p>
                        Features include: filtering, sorting, cart, seat-selection, account registration, login, admin CRUD functionality, and editable user capabilities.
                    </p>
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Access Site
                    </a> */}

                {/* Insert images of prototype */}
                {/* <Image src="/images/ticketing-site.png" alt="Ticketing website" /> */}
                {/* </div> */}
            </section>
        </div>
    );
}

export default webdev;