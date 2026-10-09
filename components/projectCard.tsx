// One project card, shared by the UI & Design and Coding pages: text in one
// column, screens in the other, and the arrow to its detail page along the
// bottom. `flipped` swaps the columns so consecutive cards alternate sides.

import type { DesignProject } from "../data/designProjects";
import CaseStudyLink from "./caseStudyLink";
import DemoMedia from "./demoMedia";

type Props = {
    project: DesignProject;
    flipped?: boolean;
    // Where the arrow leads: `${basePath}/${slug}`.
    basePath?: string;
    linkLabel?: string;
};

function ProjectCard({ project, flipped = false, basePath = "/design", linkLabel }: Props) {
    const { slug, title, meta, summary, media, image, video, features } = project;

    return (
        <article id={slug} className={`case-card media-${media}${flipped ? " flipped" : ""}`}>
            <div className="case-text">
                <h3>{title}</h3>
                {meta && <p className="case-meta">{meta}</p>}
                <p className="case-summary">{summary}</p>
            </div>

            {media === "phones" ? (
                <div className="case-media phones">
                    {features.filter((f) => !f.hideOnCard).slice(0, 2).map((feature, i) => (
                        <div key={feature.name} className={`phone-slot slot-${i + 1}`}>
                            <DemoMedia
                                frame="phone"
                                image={feature.image}
                                video={feature.video}
                                alt={`${title}: ${feature.name.replace(/\.$/, "")} screen`}
                            />
                            <p className="case-caption">
                                <strong>{feature.name}</strong> {feature.blurb}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="case-media wide">
                    <DemoMedia
                        frame="wide"
                        image={image ?? features[0].image}
                        video={video}
                        alt={`${title} demo`}
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
                <CaseStudyLink href={`${basePath}/${slug}`} label={linkLabel} />
            </div>
        </article>
    );
}

export default ProjectCard;
