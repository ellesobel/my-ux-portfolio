// The images in a case-study section (journey map, sketches, mood board). They
// show as small thumbnails; a click opens one large in the same modal as the
// Features section, where arrows (and the arrow keys) step through the rest.

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CaseFigure } from "../data/designProjects";

type Props = {
    figures: CaseFigure[];
};

function ProcessGallery({ figures }: Props) {
    // Index of the image open in the modal, or null when it's closed.
    const [index, setIndex] = useState<number | null>(null);
    const active = index === null ? null : figures[index];
    const close = useCallback(() => setIndex(null), []);
    const step = useCallback(
        (by: number) => setIndex((i) => (i === null ? i : (i + by + figures.length) % figures.length)),
        [figures.length],
    );

    // While open: Escape closes it, the arrow keys step, the page stays put.
    useEffect(() => {
        if (!active) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [active, close, step]);

    return (
        <>
            <div className={`case-figures${figures.length > 1 ? " gallery" : ""}`}>
                {figures.map((figure, i) => (
                    <figure key={figure.src} className="case-figure">
                        <button type="button" onClick={() => setIndex(i)} aria-label={`View ${figure.caption ?? figure.alt} larger`}>
                            <Image
                                src={figure.src}
                                alt={figure.alt}
                                width={figure.width}
                                height={figure.height}
                                sizes="(max-width: 650px) 50vw, 260px"
                            />
                        </button>
                        {figure.caption && <figcaption>{figure.caption}</figcaption>}
                    </figure>
                ))}
            </div>

            {/* The backdrop and caption close it; the image itself doesn't. */}
            {active && (
                <div
                    className="art-modal feature-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.caption ?? active.alt}
                    onClick={close}
                >
                    <figure className="art-modal-inner">
                        <Image
                            key={active.src}
                            className="process-modal-img"
                            src={active.src}
                            alt={active.alt}
                            width={active.width}
                            height={active.height}
                            sizes="90vw"
                            onClick={(event) => event.stopPropagation()}
                        />
                        {active.caption && (
                            <figcaption className="art-modal-caption">
                                <h3>{active.caption}</h3>
                            </figcaption>
                        )}
                    </figure>
                    {figures.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="feature-modal-key feature-modal-prev"
                                aria-label="Previous image"
                                onClick={(event) => { event.stopPropagation(); step(-1); }}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8" /></svg>
                            </button>
                            <button
                                type="button"
                                className="feature-modal-key feature-modal-next"
                                aria-label="Next image"
                                onClick={(event) => { event.stopPropagation(); step(1); }}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8" /></svg>
                            </button>
                        </>
                    )}
                    <button type="button" className="feature-modal-key feature-modal-close" aria-label="Close" onClick={close}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 5l14 14M19 5L5 19" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}

export default ProcessGallery;
