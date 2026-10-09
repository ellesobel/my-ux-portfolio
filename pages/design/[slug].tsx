// Case study for one UI & Design project. Projects with a written-up
// `caseStudy` show its sections (and a hero demo, if it has one); the rest
// show filler sections until theirs are written. Either way the demos lead.

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
            {/* Kept short, so the work starts high on the screen: the summary
                and links share a row on wide screens. */}
            <header className="case-study-header">
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
            </header>

            {caseStudy?.heroVideo && (
                <div className="case-study-hero">
                    <DemoMedia
                        frame="wide"
                        image="/images/placeholders/wide.svg"
                        video={caseStudy.heroVideo}
                        alt={`${title} walkthrough`}
                    />
                </div>
            )}

            {/* The work first: a recruiter who never scrolls still sees the app. */}
            {/* The screens say what they are; the heading is for screen readers. */}
            <h2 className="visually-hidden">
                {media === "phones" ? "Features" : "Highlights"}
            </h2>
            <FeatureGallery features={features} media={media} />

            <section className="case-study-sections">
                {sections.map(({ heading, body, figures, layout }) => (
                    <div key={heading} className={`case-study-section${figures ? " has-figures" : ""}`}>
                        <h3>{heading}</h3>
                        {body}
                        {figures && <ProcessGallery figures={figures} layout={layout} />}
                    </div>
                ))}
            </section>

        </div>
    );
}

export default CaseStudy;
