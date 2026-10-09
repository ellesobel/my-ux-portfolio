// The images in a case-study section (journey map, sketches, mood board). They
// show as small thumbnails; a click opens one large in the same modal as the
// Features section, where arrows, the arrow keys, or a sideways swipe step
// through the rest.
//
// A figure with a `set` (all the sketches, all the wireframes) shows just its
// cover in the overview and opens as a grid of the whole set. Any image in the
// grid opens large; the arrows then step within the set, and Back (or Escape)
// returns to the grid.

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import type { CaseFigure } from "../data/designProjects";
import ModalArrows, { ModalClose } from "./modalArrows";

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
    // Index within the open figure's set of the image shown large, or null
    // while the set's grid is showing (or the figure has no set).
    const [zoom, setZoom] = useState<number | null>(null);
    const set = active?.set;
    const open = (i: number) => {
        setIndex(i);
        setZoom(null);
        setDirection(null);
    };
    const close = useCallback(() => {
        setIndex(null);
        setZoom(null);
        setDirection(null);
    }, []);
    // Back from one image of a set to the set's grid.
    const back = useCallback(() => {
        setZoom(null);
        setDirection(null);
    }, []);
    // Within a set's image, step through the set; otherwise through the
    // section's figures.
    const step = useCallback(
        (by: number) => {
            setDirection(by > 0 ? "next" : "prev");
            if (set && zoom !== null) {
                setZoom((z) => (z === null ? z : (z + by + set.length) % set.length));
            } else {
                setZoom(null);
                setIndex((i) => (i === null ? i : (i + by + figures.length) % figures.length));
            }
        },
        [figures.length, set, zoom],
    );
    const canStep = set && zoom !== null ? set.length > 1 : figures.length > 1;

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
        if (!start || !canStep) return;
        const t = event.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    };

    // While open: Escape closes it, the arrow keys step, the page stays put.
    useEffect(() => {
        if (!active) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (zoom !== null) back();
                else close();
            }
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
    }, [active, close, back, step, zoom]);

    // The single image on show: one of a set, or the figure itself.
    const shown = set && zoom !== null ? set[zoom] : active;
    // Fit the image to the screen: as wide as the room allows, as tall as the
    // screen allows for its shape, and never past 1.5x its own size, where it
    // would go soft (see .process-modal-img).
    const fit = (img: { width: number; height: number }) =>
        ({ "--ar": img.width / img.height, "--w": img.width } as CSSProperties);

    return (
        <>
            <div className={`case-figures${figures.length > 1 ? " gallery" : ""}`}>
                {figures.map((figure, i) => (
                    <figure key={figure.src} className="case-figure">
                        <button type="button" onClick={() => open(i)} aria-label={`View ${figure.caption ?? figure.alt} larger`}>
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
                        key={`${active.src}-${zoom ?? "all"}`}
                        className={`art-modal-inner${direction ? ` slide-${direction}` : ""}`}
                    >
                        <div className="modal-stage">
                            {set && zoom === null ? (
                                <div
                                    className="process-set-grid modal-media"
                                    style={{ "--n": set.length } as CSSProperties}
                                    data-n={set.length}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {set.map((img, j) => (
                                        <button
                                            key={img.src}
                                            type="button"
                                            aria-label={`View ${img.alt} larger`}
                                            onClick={() => { setDirection(null); setZoom(j); }}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={img.width}
                                                height={img.height}
                                                sizes="(max-width: 650px) 80vw, 340px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                shown && (
                                    <Image
                                        className="process-modal-img modal-media"
                                        src={shown.src}
                                        alt={shown.alt}
                                        width={shown.width}
                                        height={shown.height}
                                        sizes="(max-width: 650px) 100vw, 1100px"
                                        style={fit(shown)}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                )
                            )}
                            {canStep && <ModalArrows onStep={step} noun="image" />}
                        </div>
                        {active.caption && (
                            <figcaption className="art-modal-caption">
                                <h3>{active.caption}</h3>
                                {set && (
                                    <h4>
                                        {zoom === null
                                            ? `All ${set.length}. Tap one to see it larger.`
                                            : `${zoom + 1} of ${set.length}`}
                                    </h4>
                                )}
                            </figcaption>
                        )}
                        {set && zoom !== null && (
                            <button
                                type="button"
                                className="process-set-back"
                                onClick={(event) => { event.stopPropagation(); back(); }}
                            >
                                &larr; All {active.caption?.toLowerCase() ?? "images"}
                            </button>
                        )}
                    </figure>
                    <ModalClose onClose={close} />
                </div>
            )}
        </>
    );
}

export default ProcessGallery;
