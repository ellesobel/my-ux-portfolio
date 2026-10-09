// The Features section of a case-study page. The screens sit in one row that
// shrinks to fit, or, for four, a 2 x 2 grid once one row would be too small —
// never a lopsided 3 + 1 (see .case-study-features in App.css).
//
// On a phone the screens are thumbnails: a tap opens one large in a modal
// (styled like the art gallery's lightbox) with its caption, where the demo
// plays with the same play/pause control as everywhere else.

import { useCallback, useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import type { Feature } from "../data/designProjects";
import DemoMedia from "./demoMedia";
import { setupVideoToggles } from "../utils/videoToggle";

// Matches the site's phone breakpoint in App.css.
const PHONE_QUERY = "(max-width: 650px)";

type Props = {
    features: Feature[];
    media: "phones" | "wide" | "browser";
};

function FeatureGallery({ features, media }: Props) {
    const phones = media === "phones";
    const [active, setActive] = useState<Feature | null>(null);
    const close = useCallback(() => setActive(null), []);

    // Capture phase, so on a phone the tap opens the modal instead of
    // reaching the thumbnail's video and starting it.
    const openOnPhone = (feature: Feature) => (event: MouseEvent) => {
        if (!phones || !window.matchMedia(PHONE_QUERY).matches) return;
        event.preventDefault();
        event.stopPropagation();
        setActive(feature);
    };

    // While open: Escape closes it, the page behind stays put, and the demo
    // gets its play/pause control and starts playing.
    useEffect(() => {
        if (!active) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
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
    }, [active, close]);

    const name = (feature: Feature) => feature.name.replace(/\.$/, "");

    return (
        <>
            {phones && <p className="feature-tap-hint">Tap a screen to see it larger.</p>}
            <section
                className={`case-study-features ${media}`}
                data-count={features.length}
                style={{ "--cols": features.length } as CSSProperties}
            >
                {features.map((feature) => (
                    <figure
                        key={feature.name}
                        className="case-study-feature"
                        onClickCapture={openOnPhone(feature)}
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
                >
                    <figure className="art-modal-inner">
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
                    <button type="button" className="feature-modal-close" aria-label="Close" onClick={close}>
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
