// Case study for one UI & Design project. Filler for now: the structure is
// real, the copy and images are placeholders to be written up later.

import Image from "next/image";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { GetStaticPaths, GetStaticProps } from "next";
import { allDesignProjects } from "../../data/designProjects";
import { useEffect } from "react";
import DemoMedia, { DEMO_VIDEO_SELECTOR } from "../../components/demoMedia";
import { setupVideoToggles } from "../../utils/videoToggle";

const FILLER =
    "Case study coming soon. This section will walk through the thinking behind " +
    "the project, the decisions along the way, and what came out of them.";

const SECTIONS = ["Overview", "The Problem", "Process", "Outcome"];

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
    const { title, meta, summary, media, features, links } = project;
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

            <div className="case-study-hero">
                <Image
                    src="/images/placeholders/wide.svg"
                    alt={`${title} hero placeholder`}
                    width={640}
                    height={400}
                    unoptimized
                />
            </div>

            <section className="case-study-sections">
                {SECTIONS.map((heading) => (
                    <div key={heading} className="case-study-section">
                        <h3>{heading}</h3>
                        <p>{FILLER}</p>
                    </div>
                ))}
            </section>

            <h2 className="case-section-title">{media === "phones" ? "Features" : "Highlights"}</h2>
            <section className={`case-study-features ${media}`}>
                {features.map((feature) => (
                    <figure key={feature.name} className="case-study-feature">
                        <DemoMedia
                            frame={media === "phones" ? "phone" : "wide"}
                            image={feature.image}
                            video={feature.video}
                            alt={`${feature.name.replace(/\.$/, "")} demo`}
                        />
                        <figcaption className="case-caption">
                            <strong>{feature.name}</strong> {feature.blurb}
                        </figcaption>
                    </figure>
                ))}
            </section>
        </div>
    );
}

export default CaseStudy;
