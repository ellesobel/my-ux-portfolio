//other miscellaneous art projects

import Image from "next/image";
import Head from "next/head";

function other() {
    return (
        <div className="page art-page">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Are+You+Serious&family=Asset&family=Barrio&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="art-gallery">
                <div className="gallery-title">
                    <span className="g-eliana">Eliana&#39;s</span>
                    <span className="g-art">Art</span>
                    <span className="g-gallery">Gallery</span>
                </div>

                <div className="art-photos">
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_3.avif"
                            alt="Pencil"
                            width={490}
                            height={400}
                        />
                        <div className="art-caption">
                            <h3>Pencil on Paper</h3>
                        </div>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_5.avif"
                            alt="Watercolor"
                            width={299}
                            height={400}
                        />
                        <div className="art-caption">
                            <h3>Watercolor on Paper</h3>
                        </div>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_4.avif"
                            alt="Mixed Media"
                            width={299}
                            height={400}
                        />
                        <div className="art-caption">
                            <h3>Mixed Media on Paper</h3>
                            <h4>Watercolor, Marker, Colored Pencil, Collage, Ink</h4>
                        </div>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_1.avif"
                            alt="Beads and Embroidery"
                            width={299}
                            height={400}
                        />
                        <div className="art-caption">
                            <h3>Embroidery + Beading on Denim</h3>
                        </div>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_2.avif"
                            alt="Charcoal"
                            width={299}
                            height={400}
                        />
                        <div className="art-caption">
                            <h3>Charcoal on Paper</h3>
                        </div>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_7.jpg"
                            alt="Collage"
                            width={1679}
                            height={1866}
                        />
                        <div className="art-caption">
                            <h3>Collage on Paper</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default other;
