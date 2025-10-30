//figma projects

import Image from "next/image";

function Figma() {
    return (
        <>
            <p>Eliana&#39;s Figma Projects</p>

            <section className="projects">
                <div id="music-app">
                    <h3>Music Mapping App</h3>
                    <p>I created this interactive mobile app prototype using Figma.
                        The app will give you directions to the different addresses of locations mentioned in songs.
                        There are 3 different flows to choose a song destination.
                        I utilized wireframing and conducted user testing for this project.
                    </p>
                    <a
                        href="https://www.figma.com/proto/2VKtHdxEqOimViafopvew0/Eliana-Semester-Second-Half?page-id=1%3A2&node-id=295-1989&starting-point-node-id=295%3A1989&show-proto-sidebar=1&t=6mWFIjEwga52zpoi-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access prototype
                    </a>

                    {/* Insert images of prototype */}
                    <div className="app-photos">
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
                    </div>
                </div>
                <div id="pnc-redesign">
                    <h3>PNC Redesign for Mobile and Watchface</h3>
                    <p>In collaboration with Andrew Pandji and Gabrielle Barthelmy, we redesigned the PNC Mobile App and a new watchface version.
                        For this project, we created a new design system, explored different visualizations of data, and enhanced the accessibility of the app.
                        For the watchface design, we explored goals and miniaturized data visualization.
                    </p>
                    <a
                        href="go-find-it"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access prototype
                    </a>

                    {/* Insert images of prototype */}
                    {/* <Image src="/images/pnc-redesign.png" alt="PNC Redesign prototype" 
                            fill 
                            style={{ objectFit: "cover" }} /> */}
                </div>
                <div id="emissions-app">
                    <h3>CO2 Emissions App</h3>
                    <p>I created this interactive mobile app prototype using Figma.
                        It features 2 different designs to read per capita CO2 emission data, as affected by international events.
                        I utilized wireframing and conducted user testing for this project.
                    </p>
                    <a
                        href="https://www.figma.com/proto/2VKtHdxEqOimViafopvew0/Eliana-Semester-Second-Half?page-id=0%3A1&node-id=157-2850&starting-point-node-id=157%3A2850&show-proto-sidebar=1&t=IHWeVHMJ6jMLMY6N-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access prototype
                    </a>

                    {/* Insert images of prototype */}

                    <div className="app-photos">
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
                </div>
                <div id="picky-site">
                    <h3>Picky Eater Site</h3>
                    <p>I designed this interactive site protype using Figma.
                        It is an exhibit of all of the weird foods I don&#39;t eat, as a recovering picky eater.
                        I utilized wireframing and conducted user testing for this project.
                    </p>
                    <a
                        href="go-find-it"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access prototype
                    </a>

                    {/* Insert images of prototype */}
                    {/* <Image src="/images/picky-site.png" alt="Picky Eater Site prototype" 
                            fill 
                            style={{ objectFit: "cover" }}/> */}
                </div>
            </section>
        </>
    );
}

export default Figma;