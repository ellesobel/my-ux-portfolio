// Case study for one UI & Design project. Filler for now: the structure is
// real, the copy and images are placeholders to be written up later.

import Image from "next/image";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { GetStaticPaths, GetStaticProps } from "next";
import { allDesignProjects } from "../../data/designProjects";

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

            <Image
                className="case-study-hero"
                src="/images/placeholders/wide.svg"
                alt={`${title} hero placeholder`}
                width={640}
                height={400}
                unoptimized
            />

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
                        <Image
                            className={media === "phones" ? "phone-img" : "wide-img"}
                            src={feature.image}
                            alt={`${feature.name.replace(/\.$/, "")} placeholder`}
                            width={media === "phones" ? 200 : 640}
                            height={media === "phones" ? 410 : 400}
                            unoptimized
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
