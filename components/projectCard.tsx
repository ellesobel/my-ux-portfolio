// One project on the UI & Design page: text in one column, screens in the
// other, and the case-study arrow along the bottom. `flipped` swaps the columns
// so consecutive cards alternate sides.

import Image from "next/image";
import type { DesignProject } from "../data/designProjects";
import CaseStudyLink from "./caseStudyLink";

function ProjectCard({ project, flipped = false }: { project: DesignProject; flipped?: boolean }) {
    const { slug, title, meta, summary, media, image, features } = project;

    return (
        <article id={slug} className={`case-card${flipped ? " flipped" : ""}`}>
            <div className="case-text">
                <h3>{title}</h3>
                {meta && <p className="case-meta">{meta}</p>}
                <p className="case-summary">{summary}</p>
            </div>

            {media === "phones" ? (
                <div className="case-media phones">
                    {features.slice(0, 2).map((feature, i) => (
                        <div key={feature.name} className={`phone-slot slot-${i + 1}`}>
                            <Image
                                className="phone-img"
                                src={feature.image}
                                alt={`${title}: ${feature.name.replace(/\.$/, "")} screen`}
                                width={200}
                                height={410}
                                unoptimized
                            />
                            <p className="case-caption">
                                <strong>{feature.name}</strong> {feature.blurb}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="case-media wide">
                    <Image
                        className="wide-img"
                        src={image ?? features[0].image}
                        alt={`${title} placeholder`}
                        width={640}
                        height={400}
                        unoptimized
                    />
                    <div className="case-highlights">
                        {features.map((feature) => (
                            <p key={feature.name} className="case-caption">
                                <strong>{feature.name}</strong> {feature.blurb}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            <div className="case-cta">
                <CaseStudyLink href={`/design/${slug}`} />
            </div>
        </article>
    );
}

export default ProjectCard;
