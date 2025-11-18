//other miscellaneous art projects

import Image from "next/image";

function other() {
    return (
        <div className="page">
            <h2 className="page-title">Eliana&#39;s Other Miscellaneous Projects</h2>
            <div className="projects">

                <div className="art-photos">
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_1.avif"
                            alt="Beads and Embroidery"
                            width={299}
                            height={400}
                        />
                        <h3>Embroidery + Beading on Denim</h3>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_2.avif"
                            alt="Charcoal"
                            width={299}
                            height={400}
                        />
                        <h3>Charcoal on Paper</h3>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_5.avif"
                            alt="Watercolor"
                            width={299}
                            height={400}
                        />
                        <h3>Watercolor on Paper</h3>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_3.avif"
                            alt="Pencil"
                            width={490}
                            height={400}
                        />
                        <h3>Pencil on Paper</h3>
                    </div>
                    <div className="art-card">
                        <Image className="art-img"
                            src="/images/art_4.avif"
                            alt="Mixed Media"
                            width={299}
                            height={400}
                        />
                        <h3>Mixed Media on Paper</h3>
                        <h4>Watercolor, Marker, Colored Pencil, Collage, Ink</h4>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default other;