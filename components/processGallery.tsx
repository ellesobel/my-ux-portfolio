// The images in a case-study section (journey map, sketches, mood board). They
// show as small thumbnails; a click opens one large in the same modal as the
// Features section, where arrows, the arrow keys, or a sideways swipe step
// through the rest.
//
// A figure with a `set` (all the sketches, all the wireframes) shows just its
// cover in the overview and opens as a grid of the whole set.
//
// A `sameScale` set (wireframes) gives every image one height instead of one
// width, so a screen is the same size whether its image holds two or three.
//
// The "lead" layout shows the first figure large with the rest in a 2 x 2
// beside it, for a section the images carry (the music map's look).

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import type { CaseFigure } from "../data/designProjects";
import ModalArrows, { ModalClose } from "./modalArrows";

// How far a finger must travel sideways, more than it moves up or down, to
// count as a swipe rather than a tap (as in FeatureGallery).
const SWIPE_PX = 40;

// Wide shapes (width / height) of a same-scale set, laid out in one row or two,
// whichever shows the screens bigger in a modal about 1100 x 500. The CSS
// sizes the shared height from the widest row (see .process-set-rows).
const ROOM_W = 1100;
const ROOM_H = 500;
const GAP = 16;
function sameScaleRows(set: { width: number; height: number }[]) {
    const ratios = set.map((img) => img.width / img.height);
    const rowsOf = (n: number) => {
        const per = Math.ceil(ratios.length / n);
        return Array.from({ length: n }, (_, r) => ratios.slice(r * per, (r + 1) * per));
    };
    const height = (rows: number[][]) =>
        Math.min(
            ...rows.map((row) => (ROOM_W - GAP * (row.length - 1)) / row.reduce((a, b) => a + b, 0)),
            ROOM_H / rows.length,
        );
    const options = ratios.length > 2 ? [rowsOf(1), rowsOf(2)] : [rowsOf(1)];
    const rows = options.reduce((best, o) => (height(o) > height(best) ? o : best));
    const widest = rows.reduce((a, b) =>
        b.reduce((x, y) => x + y, 0) > a.reduce((x, y) => x + y, 0) ? b : a,
    );
    return {
        sizes: rows.map((row) => row.length),
        style: {
            "--rows": rows.length,
            "--sum": widest.reduce((a, b) => a + b, 0),
            "--gaps": widest.length - 1,
            "--amax": Math.max(...ratios),
        } as CSSProperties,
    };
}

type Props = {
    figures: CaseFigure[];
    layout?: "lead";
};

function ProcessGallery({ figures, layout }: Props) {
    // Index of the image open in the modal, or null when it's closed.
    const [index, setIndex] = useState<number | null>(null);
    const active = index === null ? null : figures[index];
    // Which way the last step went, so the next image slides in from that side.
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const set = active?.set;
    const open = (i: number) => {
        setIndex(i);
        setDirection(null);
    };
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

    // Fit the image to the screen: as wide as the room allows, as tall as the
    // screen allows for its shape, and never past 1.5x its own size, where it
    // would go soft (see .process-modal-img).
    const fit = (img: { width: number; height: number }) =>
        ({ "--ar": img.width / img.height, "--w": img.width } as CSSProperties);

    return (
        <>
            <div className={`case-figures${figures.length > 1 ? " gallery" : ""}${layout ? ` ${layout}` : ""}`}>
                {figures.map((figure, i) => (
                    <figure key={figure.src} className="case-figure">
                        <button type="button" onClick={() => open(i)} aria-label={`View ${figure.caption ?? figure.alt} larger`}>
                            <Image
                                src={figure.src}
                                alt={figure.alt}
                                width={figure.width}
                                height={figure.height}
                                sizes={
                                    layout === "lead" && i === 0
                                        ? "(max-width: 650px) 100vw, 560px"
                                        : "(max-width: 650px) 50vw, 260px"
                                }
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
                        <div className="modal-stage">
                            {set && active.sameScale ? (
                                <SameScaleSet set={set} />
                            ) : set ? (
                                <div
                                    className="process-set-grid modal-media"
                                    style={{ "--n": set.length } as CSSProperties}
                                    data-n={set.length}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {set.map((img) => (
                                        <Image
                                            key={img.src}
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            sizes="(max-width: 650px) 80vw, 340px"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Image
                                    className="process-modal-img modal-media"
                                    src={active.src}
                                    alt={active.alt}
                                    width={active.width}
                                    height={active.height}
                                    sizes="(max-width: 650px) 100vw, 1100px"
                                    style={fit(active)}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            )}
                            {figures.length > 1 && <ModalArrows onStep={step} noun="image" />}
                        </div>
                        {active.caption && (
                            <figcaption className="art-modal-caption">
                                <h3>{active.caption}</h3>
                            </figcaption>
                        )}
                    </figure>
                    <ModalClose onClose={close} />
                </div>
            )}
        </>
    );
}

type SetImage = Omit<CaseFigure, "caption" | "set" | "sameScale">;

function SameScaleSet({ set }: { set: SetImage[] }) {
    const { sizes, style } = sameScaleRows(set);
    let start = 0;
    const rows = sizes.map((n) => set.slice(start, (start += n)));
    return (
        <div className="process-set-rows modal-media" style={style} onClick={(event) => event.stopPropagation()}>
            {rows.map((row, r) => (
                <div key={r} className="process-set-row">
                    {row.map((img) => (
                        <Image
                            key={img.src}
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            sizes="(max-width: 650px) 80vw, 560px"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ProcessGallery;
