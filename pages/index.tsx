//homepage

import Link from "next/link";
import Image from "next/image";

function Home() {
    return (
        <>
            <div id="content">
                <h1>Eliana&#39;s UX Portfolio</h1>

                <div id="portfolio-links">
                    <nav>
                        <Link href="/figma" id="figma-link">
                            <button>My Figma Projects</button>
                        </Link>
                        <Link href="/webdev" id="vscode-link">
                            <button>My VSCode Projects</button>
                        </Link>
                        <Link href="/processing" id="processing-link">
                            <button>My Processing Code-Art Projects</button>
                        </Link>
                        <Link href="/other" id="art-link">
                            <button>My Miscellaneous Art Projects</button>
                        </Link>
                    </nav>
                </div>

                <div id="about-and-subtitle">
                    <div id="subtitle">
                        <h2>Eliana Sobel</h2>
                        <h3>New York, NY / St. Louis, MO</h3>
                    </div>
                    <div id="about">
                        <p id="p1">Hi! I&#39;m a third-year Computer Science student at Washington University in St. Louis.
                            I am pursuing minors in Design and Human-Computer Interaction.
                        </p>
                        <p id="p2">
                            I&#39;m currently doing usability research in the <Link href="https://sites.wustl.edu/greenberglab/synaptrack/">Greenberg Lab on SynapTrack</Link>, a clinical-facing medical app for neurosurgery patients.
                        </p>
                        <p id="p3">
                            {/* I love blending creativity with functionality to design thoughtful, user-first experiences.
                            Whether I&#39;m sketching interfaces and wireframes or diving into code,
                            I&#39;m always looking for ways to make tech more intuitive, accessible, and just a little more delightful. */}
                            I love designing interfaces that blend creativity and functionality to create an intuitive and accessible tech experience.
                        </p>
                        <p id="p4">
                            {/* I have experience working with tools like Figma and Adobe Illustrator for interface and visual design,
                            and I use HTML, CSS, JavaScript, and React to bring those designs to life on the web.
                            I build polished and responsive front-end experiences that utilize clean code while maintaining user-friendly design principles. */}
                            I work across Figma / Illustrator for visual design and code in React, HTML, CSS, and JavaScript to bring those designs to life.
                        </p>
                    </div>
                    {/* <Image className="me"
                        src="/images/me_purple.png"
                        alt="Me"
                        width={727 / 2}
                        height={968 / 2}
                    /> */}
                </div>

            </div>


        </>
    );
}

export default Home;