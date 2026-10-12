// Feature page for one coding project — the coding page's stand-in for a case
// study. It leads with what the project does (feature highlights), then shows
// how it was built: stack, how it works, the hardest problem, and the UX
// details handled in code. Filler where the copy isn't written yet.

import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { GetStaticPaths, GetStaticProps } from "next";
import { codingProjects } from "../../data/codingProjects";
import { useEffect } from "react";
import DemoMedia, { DEMO_VIDEO_SELECTOR } from "../../components/demoMedia";
import { setupVideoToggles } from "../../utils/videoToggle";

type Props = { slug: string };

export const getStaticPaths: GetStaticPaths = () => ({
    paths: codingProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
});

// Only the slug crosses into props — the summaries are JSX, which can't be
// serialized, so the page looks the project up itself.
export const getStaticProps: GetStaticProps<Props> = ({ params }) => ({
    props: { slug: String(params?.slug) },
});

function FeaturePage({ slug }: Props) {
    const project = codingProjects.find((p) => p.slug === slug)!;
    const { title, summary, image, video, features, links, stack, howItWorks, challenge, uxDetails, next } = project;
    useEffect(() => setupVideoToggles(DEMO_VIDEO_SELECTOR), [slug]);

    return (
        <div className="page design-page coding-page case-study">
            <Link href="/coding" className="case-back">
                &larr; All coding projects
            </Link>
            <h2 className="page-title">{title}</h2>
            <p className="case-summary case-study-lede">{summary}</p>

            <ul className="stack-chips" aria-label="Built with">
                {stack.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>

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
                <DemoMedia frame="wide" image={image ?? features[0].image} video={video} alt={`${title} demo`} />
            </div>

            <h2 className="case-section-title">Feature Highlights</h2>
            <section className="case-list">
                {features.map((feature, i) => (
                    <figure key={feature.name} className={`feature-row${i % 2 === 1 ? " flipped" : ""}`}>
                        <DemoMedia
                            frame="wide"
                            image={feature.image}
                            video={feature.video}
                            alt={`${feature.name.replace(/\.$/, "")} demo`}
                        />
                        <figcaption>
                            <h3>{feature.name.replace(/\.$/, "")}</h3>
                            <p>{feature.blurb}</p>
                        </figcaption>
                    </figure>
                ))}
            </section>

            <h2 className="case-section-title">Under the Hood</h2>
            <section className="case-study-sections">
                <div className="case-study-section">
                    <h3>How It Works</h3>
                    <ul>{howItWorks.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
                <div className="case-study-section">
                    <h3>The Hard Part</h3>
                    <p><strong>Problem:</strong> {challenge.problem}</p>
                    <p><strong>Solution:</strong> {challenge.solution}</p>
                </div>
                <div className="case-study-section">
                    <h3>UX in the Code</h3>
                    <ul>{uxDetails.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
                <div className="case-study-section">
                    <h3>What&#39;s Next</h3>
                    <ul>{next.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
            </section>
        </div>
    );
}

export default FeaturePage;
