//other miscellaneous art projects

import Image from "next/image";
import Head from "next/head";
import { CSSProperties, MouseEvent, useCallback, useEffect, useState } from "react";

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
    { src: "/images/art_3.avif", alt: "Pencil", width: 490, height: 400, title: "Pencil on Paper" },
    { src: "/images/art_5.avif", alt: "Watercolor", width: 299, height: 400, title: "Watercolor on Paper" },
    {
        src: "/images/art_4.avif", alt: "Mixed Media", width: 299, height: 400,
        title: "Mixed Media on Paper", medium: "Watercolor, Marker, Colored Pencil, Collage, Ink",
    },
    { src: "/images/art_1.avif", alt: "Beads and Embroidery", width: 299, height: 400, title: "Embroidery + Beading on Denim" },
    { src: "/images/art_2.avif", alt: "Charcoal", width: 299, height: 400, title: "Charcoal on Paper" },
    { src: "/images/art_7.jpg", alt: "Collage", width: 1679, height: 1866, title: "Collage on Paper" },
];

// Phone-only affordance — on wider screens hovering a frame already reveals it,
// and the frames are big enough to read without opening anything.
const PHONE = "(max-width: 650px)";

// Matches the painting-sway animation on .art-modal-img.swaying in App.css.
const SWAY_MS = 700;

function Other() {
    const [active, setActive] = useState<Piece | null>(null);
    // The accent the wall gives this piece on hover, read off the card that was
    // tapped so the palette stays in App.css rather than being repeated here.
    const [mat, setMat] = useState("");
    const [swaying, setSwaying] = useState(false);

    const close = useCallback(() => {
        setActive(null);
        setSwaying(false);
    }, []);

    const openOnPhone = (piece: Piece, card: HTMLElement) => {
        if (!window.matchMedia(PHONE).matches) return;
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
        const id = window.setTimeout(() => setSwaying(false), SWAY_MS);
        return () => window.clearTimeout(id);
    }, [swaying]);

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

    // Rotating to a wider screen would otherwise strand the modal open
    useEffect(() => {
        const phone = window.matchMedia(PHONE);
        const onChange = () => {
            if (!phone.matches) close();
        };
        phone.addEventListener("change", onChange);
        return () => phone.removeEventListener("change", onChange);
    }, [close]);

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
                        <div className="art-card" key={piece.src} onClick={(event) => openOnPhone(piece, event.currentTarget)}>
                            <Image className="art-img"
                                src={piece.src}
                                alt={piece.alt}
                                width={piece.width}
                                height={piece.height}
                            />
                            <div className="art-caption">
                                <h3>{piece.title}</h3>
                                {piece.medium && <h4>{piece.medium}</h4>}
                            </div>
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
                            style={{ "--mat": mat } as CSSProperties}
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
