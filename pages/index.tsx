//homepage

import Link from "next/link";


function Home(){
    return(
        <>
            <h1>Eliana&#39;s UX Portfolio</h1>

            <h2>Eliana Sobel</h2>
            <h3>New York, NY / St. Louis, MO</h3>

            <div id="about">
                <p>Hi! I&#39;m a third-year Computer Science student at Washington University in St. Louis in the McKelvey School of Engineering. 
                    I am also pursuing minors in Design and Human-Computer Interaction. 
                    I love blending creativity with functionality to design thoughtful, user-first experiences. 
                    Whether I&#39;m sketching interfaces and wireframes or diving into code, 
                    I&#39;m always looking for ways to make tech more intuitive, accessible, and just a little more delightful.
                </p>
                <p>I have experience working with tools like Figma and Adobe Illustrator for interface and visual design, 
                    and I use HTML, CSS, JavaScript, and React to bring those designs to life on the web. 
                    I enjoy building polished, responsive front-end experiences that utilize clean code while maintaining user-friendly design principles.
                </p>
            </div>

            <div id="portfolio-links">
                <p>Welcome to my portfolio. Here you&#39;ll find a selection of my work. 
                    Click around to explore my projects to learn more about what I do.
                </p>
                <nav>
                    <Link href="/figma">
                        <button>My Figma Projects</button>
                    </Link>
                    <Link href="/webdev">
                        <button>My VSCode Projects</button>
                    </Link>
                    <Link href="/other">
                        <button>My Miscellaneous Art Projects</button>
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Home;