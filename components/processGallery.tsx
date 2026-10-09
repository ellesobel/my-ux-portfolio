// The images in a case-study section (journey map, sketches, mood board). They
// show as small thumbnails; a click opens one large in the same modal as the
// Features section, where arrows, the arrow keys, or a sideways swipe step
// through the rest.

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import type { CaseFigure } from "../data/designProjects";

// How far a finger must travel sideways, more than it moves up or down, to
// count as a swipe rather than a tap (as in FeatureGallery).
const SWIPE_PX = 40;

type Props = {
    figures: CaseFigure[];
};

function ProcessGallery({ figures }: Props) {
    // Index of the image open in the modal, or null when it's closed.
    const [index, setIndex] = useState<number | null>(null);
    const active = index === null ? null : figures[index];
    // Which way the last step went, so the next image slides in from that side.
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const close = useCallback(() => {
        setIndex(null);
        setDirection(null);
    }, []);
    const step = useCallback(
        (by: number) => {
            setDirection(by > 0 ? "next" : "prev");
            setIndex((i) => (i === null ? i : (i + by + figures.length) % figures.length));
        },
        [figures.length],
    );

    // Swipe left for the next image, right for the previous. A finger that
    // moves never fires a click, so a swipe can't also close the modal.
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const onTouchStart = (event: TouchEvent) => {
        const t = event.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (event: TouchEvent) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || figures.length < 2) return;
        const t = event.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    };

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
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <figure
                        key={active.src}
                        className={`art-modal-inner${direction ? ` slide-${direction}` : ""}`}
                    >
                        <Image
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
