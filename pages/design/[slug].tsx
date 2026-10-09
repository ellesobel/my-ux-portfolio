// Case study for one UI & Design project. Projects with a written-up
// `caseStudy` show its sections (and a hero demo, if it has one); the rest
// show a filler hero and sections until theirs are written.

import Image from "next/image";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { GetStaticPaths, GetStaticProps } from "next";
import { allDesignProjects, type CaseSection } from "../../data/designProjects";
import { useEffect } from "react";
import DemoMedia, { DEMO_VIDEO_SELECTOR } from "../../components/demoMedia";
import FeatureGallery from "../../components/featureGallery";
import ProcessGallery from "../../components/processGallery";
import { setupVideoToggles } from "../../utils/videoToggle";

const FILLER =
    "Case study coming soon. This section will walk through the thinking behind " +
    "the project, the decisions along the way, and what came out of them.";

const FILLER_SECTIONS: CaseSection[] = ["Overview", "The Problem", "Process", "Outcome"].map(
    (heading) => ({ heading, body: <p>{FILLER}</p> }),
);

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = () => ({
    paths: allDesignProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
});

// Only the slug crosses into props — the summaries are JSX, which can't be
// serialized, so the page looks the project up itself.
export const getStaticProps: GetStaticProps<Props> = ({ params }) => ({
    props: { slug: String(params?.slug) },
});

function CaseStudy({ slug }: Props) {
    const project = allDesignProjects.find((p) => p.slug === slug)!;
    const { title, meta, summary, media, features, links, caseStudy } = project;
    const sections = caseStudy?.sections ?? FILLER_SECTIONS;
    useEffect(() => setupVideoToggles(DEMO_VIDEO_SELECTOR), [slug]);

    return (
        <div className="page design-page case-study">
            <Link href="/design" className="case-back">
                &larr; All designs
            </Link>
            <h2 className="page-title">{title}</h2>
            {meta && <p className="case-meta">{meta}</p>}
            <p className="case-summary case-study-lede">{summary}</p>

            {links && (
                <div className="case-study-links">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label} <OpenInNewIcon />
                        </a>
                    ))}
                </div>
            )}

            {caseStudy?.heroVideo ? (
                <div className="case-study-hero">
                    <DemoMedia
                        frame="wide"
                        image="/images/placeholders/wide.svg"
                        video={caseStudy.heroVideo}
                        alt={`${title} walkthrough`}
                    />
                </div>
            ) : (
                !caseStudy && (
                    <div className="case-study-hero">
                        <Image
                            src="/images/placeholders/wide.svg"
                            alt={`${title} hero placeholder`}
                            width={640}
                            height={400}
                            unoptimized
                        />
                    </div>
                )
            )}

            <section className="case-study-sections">
                {sections.map(({ heading, body, figures, layout }) => (
                    <div key={heading} className={`case-study-section${figures ? " has-figures" : ""}`}>
                        <h3>{heading}</h3>
                        {body}
                        {figures && <ProcessGallery figures={figures} layout={layout} />}
                    </div>
                ))}
            </section>

            <h2 className="case-section-title">{media === "phones" ? "Features" : "Highlights"}</h2>
            <FeatureGallery features={features} media={media} />
        </div>
    );
}

export default CaseStudy;
