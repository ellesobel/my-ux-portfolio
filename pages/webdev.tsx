//web dev projects

import Image from "next/image";

function webdev() {
    return (
        <>
            <h2>Eliana&#39;s Web Dev Projects</h2>

            <section className="projects">
                <div id="plant-log">
                    {/* <h3>Plant Portfolio Web App</h3>
                    <p>
                        A React-based web app that lets users track and manage their plants with ease.
                        Features include adding and editing plant entries, dynamic filtering and sorting,
                        and fetching rich plant data from external APIs for images, care instructions, and
                        species info—all in a responsive, interactive interface.
                    </p>
                    <a
                        href="https://wustl-cse204a-sp2025-1.github.io/final-project-ellesobel/#/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access site
                    </a> */}

                    {/* Insert images of prototype */}
                    {/* <Image src="/images/plant-log.png" alt="Plant Log website" /> */}
                </div>
                <div id="image-gallery">
                    <h3>Image Gallery Web App</h3>
                    <p>
                        I created an interactive flower-fact image gallery website using HTML, CSS, and JavaScript.
                        The site features modal overlays. I also designed this app to flex for all screen sizes &gt;375px.
                    </p>
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access site
                    </a>

                    {/* Insert images of prototype */}
                    <div className="web-photos">
                        <div className="web-view">
                            <Image className="app-img"
                                src="/images/flowergallery_1.png"
                                alt="Flower Gallery prototype 1"
                                width={575}
                                height={400}
                            />
                            <Image className="app-img"
                                src="/images/flowergallery_2.png"
                                alt="Flower Gallery prototype 2"

                                width={575}
                                height={400}
                            />
                            <Image className="app-img"
                                src="/images/flowergallery_3.png"
                                alt="Flower Gallery prototype 3"

                                width={575}
                                height={400}
                            />
                        </div>
                        <div className="mobile-view">
                            <Image className="app-img"
                                src="/images/flowergallery_mobile_1.png"
                                alt="Flower Gallery mobile prototype 1"

                                width={225}
                                height={400}
                            />
                            <Image className="app-img"
                                src="/images/flowergallery_mobile_2.png"
                                alt="Flower Gallery mobile prototype 2"

                                width={225}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
                <div id="brand-redesign">
                    <h3>Brand Redesign</h3>
                    <p>
                        Revitalized the restaurant&#39;s visual identity, designing a modern logo, color palette, typography, and menu layout.
                        Applied core design principles like hierarchy, balance, and consistency to create a cohesive, professional, and inviting brand experience.
                        I used HTML and CSS for this redesign.
                    </p>
                    <a
                        href="https://wustl-cse204a-sp2025-1.github.io/brand-redesign-ellesobel/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to access site
                    </a>

                    {/* Insert images of prototype */}
                    <div className="web-photos">
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
                </div>
                <div id="ticketing-site">
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
                        Click here to access site
                    </a> */}

                    {/* Insert images of prototype */}
                    {/* <Image src="/images/ticketing-site.png" alt="Ticketing website" /> */}
                </div>
            </section>
        </>
    );
}

export default webdev;