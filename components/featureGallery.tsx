// The Features section of a case-study page. The screens sit in one row that
// shrinks to fit, or, for four, a 2 x 2 grid once one row would be too small —
// never a lopsided 3 + 1 (see .case-study-features in App.css).
//
// On a phone the screens are thumbnails: a tap opens one large in a modal
// (styled like the art gallery's lightbox) with its caption, where the demo
// plays with the same play/pause control as everywhere else. Arrows, the
// arrow keys, or a sideways swipe step through the other features without
// closing it.

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent } from "react";
import type { Feature } from "../data/designProjects";
import DemoMedia from "./demoMedia";
import { setupVideoToggles } from "../utils/videoToggle";

// Matches the site's phone breakpoint in App.css.
const PHONE_QUERY = "(max-width: 650px)";

// How far a finger must travel sideways, more than it moves up or down, to
// count as a swipe rather than a tap.
const SWIPE_PX = 40;

type Props = {
    features: Feature[];
    media: "phones" | "wide" | "browser";
};

function FeatureGallery({ features, media }: Props) {
    const phones = media === "phones";
    // Index of the feature open in the modal, or null when it's closed.
    const [index, setIndex] = useState<number | null>(null);
    const active = index === null ? null : features[index];
    // Which way the last step went, so the next screen slides in from that side.
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const close = useCallback(() => {
        setIndex(null);
        setDirection(null);
    }, []);
    const step = useCallback(
        (by: number) => {
            setDirection(by > 0 ? "next" : "prev");
            setIndex((i) => (i === null ? i : (i + by + features.length) % features.length));
        },
        [features.length],
    );

    // Swipe left for the next feature, right for the previous. A finger that
    // moves never fires a click, so a swipe can't also close the modal or
    // toggle the video.
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const onTouchStart = (event: TouchEvent) => {
        const t = event.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (event: TouchEvent) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || features.length < 2) return;
        const t = event.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    };

    // Capture phase, so on a phone the tap opens the modal instead of
    // reaching the thumbnail's video and starting it.
    const openOnPhone = (i: number) => (event: MouseEvent) => {
        if (!phones || !window.matchMedia(PHONE_QUERY).matches) return;
        event.preventDefault();
        event.stopPropagation();
        setIndex(i);
    };

    // While open: Escape closes it, the page behind stays put, and the demo
    // gets its play/pause control and starts playing.
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
        const removeToggles = setupVideoToggles(".feature-modal .app-video");
        document.querySelector<HTMLVideoElement>(".feature-modal video")?.play().catch(() => {});

        return () => {
            removeToggles();
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [active, close, step]);

    const name = (feature: Feature) => feature.name.replace(/\.$/, "");

    return (
        <>
            {phones && <p className="feature-tap-hint">Tap a screen to see it larger.</p>}
            <section
                className={`case-study-features ${media}`}
                data-count={features.length}
                style={{ "--cols": features.length } as CSSProperties}
            >
                {features.map((feature, i) => (
                    <figure
                        key={feature.name}
                        className="case-study-feature"
                        onClickCapture={openOnPhone(i)}
                    >
                        <DemoMedia
                            frame={phones ? "phone" : "wide"}
                            image={feature.image}
                            video={feature.video}
                            alt={`${name(feature)} demo`}
                        />
                        <figcaption className="case-caption">
                            <strong>{feature.name}</strong>{" "}
                            <span className="feature-blurb">{feature.blurb}</span>
                        </figcaption>
                    </figure>
                ))}
            </section>

            {/* The backdrop and caption close it; the screen itself doesn't. */}
            {active && (
                <div
                    className="art-modal feature-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={name(active)}
                    onClick={close}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <figure
                        key={active.name}
                        className={`art-modal-inner${direction ? ` slide-${direction}` : ""}`}
                    >
                        <div className="feature-modal-screen" onClick={(event) => event.stopPropagation()}>
                            <DemoMedia
                                frame="phone"
                                image={active.image}
                                video={active.video}
                                alt={`${name(active)} demo`}
                            />
                        </div>
                        <figcaption className="art-modal-caption">
                            <h3>{name(active)}</h3>
                            <h4>{active.blurb}</h4>
                        </figcaption>
                    </figure>
                    {features.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="feature-modal-key feature-modal-prev"
                                aria-label="Previous feature"
                                onClick={(event) => { event.stopPropagation(); step(-1); }}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8" /></svg>
                            </button>
                            <button
                                type="button"
                                className="feature-modal-key feature-modal-next"
                                aria-label="Next feature"
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

export default FeatureGallery;
