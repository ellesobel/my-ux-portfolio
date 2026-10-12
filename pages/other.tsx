//other miscellaneous art projects

import Image from "next/image";
import Head from "next/head";
import { CSSProperties, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

type Piece = {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    medium?: string;
};

// Order matters: .art-card:nth-child(n) in App.css places each frame on the wall.
const pieces: Piece[] = [
    { src: "/images/art_gallery/art_3.avif", alt: "Pencil", width: 490, height: 400, title: "Pencil on Paper" },
    { src: "/images/art_gallery/art_5.avif", alt: "Watercolor", width: 299, height: 400, title: "Watercolor on Paper" },
    {
        src: "/images/art_gallery/art_4.avif", alt: "Mixed Media", width: 299, height: 400,
        title: "Mixed Media on Paper", medium: "Watercolor, Marker, Colored Pencil, Collage, Ink",
    },
    { src: "/images/art_gallery/art_1.avif", alt: "Beads and Embroidery", width: 299, height: 400, title: "Embroidery + Beading on Denim" },
    { src: "/images/art_gallery/art_2.avif", alt: "Charcoal", width: 299, height: 400, title: "Charcoal on Paper" },
    { src: "/images/art_gallery/art_7.jpg", alt: "Collage", width: 1679, height: 1866, title: "Collage on Paper" },
];

// The lightbox frame's size depends on the screen, so its swing is scaled to
// it like a pendulum: at REFERENCE_HEIGHT it tilts as painting-sway-large is
// written and takes REFERENCE_MS. A taller frame tilts less, so its bottom edge
// travels about the same distance, and swings slower (period ~ sqrt(length));
// a shorter one the reverse, up to the wall's own 2.4deg and 0.7s at most.
const REFERENCE_HEIGHT = 560;
const REFERENCE_MS = 1400;
const MAX_TILT = 2;
const MIN_MS = 700;

function swingFor(height: number) {
    return {
        tilt: Math.min(MAX_TILT, REFERENCE_HEIGHT / height),
        ms: Math.round(Math.max(MIN_MS, REFERENCE_MS * Math.sqrt(height / REFERENCE_HEIGHT))),
    };
}

function Other() {
    const [active, setActive] = useState<Piece | null>(null);
    // The accent the wall gives this piece on hover, read off the card that was
    // tapped so the palette stays in App.css rather than being repeated here.
    const [mat, setMat] = useState("");
    const [swaying, setSwaying] = useState(false);
    const [swing, setSwing] = useState(() => swingFor(REFERENCE_HEIGHT));
    const modalImg = useRef<HTMLImageElement>(null);

    const close = useCallback(() => {
        setActive(null);
        setSwaying(false);
    }, []);

    const open = (piece: Piece, card: HTMLElement) => {
        setMat(getComputedStyle(card).getPropertyValue("--mat").trim());
        setActive(piece);
    };

    // Tapping the image itself doesn't close the lightbox — it knocks the frame
    // on its nail instead. Restarting the animation needs the class gone for a
    // painted frame, hence the two rAFs.
    const sway = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        setSwaying(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setSwaying(true)));
    }, []);

    // Puts the frame back to plain white once it has settled. A timer rather
    // than animationend so it also clears for anyone on reduced motion, where
    // the swing never runs.
    useEffect(() => {
        if (!swaying) return;
        const id = window.setTimeout(() => setSwaying(false), swing.ms);
        return () => window.clearTimeout(id);
    }, [swaying, swing.ms]);

    // Re-measured whenever a piece opens or the screen changes size. The
    // frame's height is set in CSS, so it is right before the image loads.
    useEffect(() => {
        if (!active) return;
        const measure = () => {
            if (modalImg.current) setSwing(swingFor(modalImg.current.offsetHeight));
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [active]);

    // Escape closes it, and the wall behind stays put while it's open.
    useEffect(() => {
        if (!active) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [active, close]);

    return (
        <div className="page art-page">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Are+You+Serious&family=Asset&family=Barrio&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="art-gallery">
                <div className="gallery-title">
                    <span className="g-eliana">Eliana&#39;s</span>
                    <span className="g-art">Art</span>
                    <span className="g-gallery">Gallery</span>
                </div>

                <div className="art-photos">
                    {pieces.map((piece) => (
                        <div className="art-card" key={piece.src} onClick={(event) => open(piece, event.currentTarget)}>
                            <Image className="art-img"
                                src={piece.src}
                                alt={piece.alt}
                                width={piece.width}
                                height={piece.height}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Anything outside the image itself — backdrop or caption — closes it */}
            {active && (
                <div
                    className="art-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.title}
                    onClick={close}
                >
                    <figure className="art-modal-inner">
                        <Image className={`art-modal-img${swaying ? " swaying" : ""}`}
                            src={active.src}
                            alt={active.alt}
                            width={active.width}
                            height={active.height}
                            ref={modalImg}
                            style={{
                                "--mat": mat,
                                "--aspect": active.width / active.height,
                                "--tilt": swing.tilt,
                                "--sway-ms": `${swing.ms}ms`,
                            } as CSSProperties}
                            onClick={sway}
                        />
                        <figcaption className="art-modal-caption">
                            <h3>{active.title}</h3>
                            {active.medium && <h4>{active.medium}</h4>}
                        </figcaption>
                    </figure>
                </div>
            )}
        </div>
    );
}

export default Other;
