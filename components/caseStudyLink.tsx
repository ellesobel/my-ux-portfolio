// "Explore this project's case study" with an arrow that stretches right across
// its column on hover. A click lets the stretch finish before navigating,
// so the arrow always lands at the edge first — whether it was halfway there
// (a quick hover), already there, or hadn't started (a tap on a phone).

import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, type MouseEvent } from "react";

// A little longer than the CSS transition, in case transitionend never fires
// (tab hidden mid-animation, or the width was interrupted).
const FALLBACK_MS = 800;

function CaseStudyLink({ href }: { href: string }) {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const leaving = useRef(false);
    const trackRef = useRef<HTMLSpanElement>(null);
    const shaftRef = useRef<HTMLSpanElement>(null);

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // New-tab and other modified clicks keep the browser's own behavior.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        if (leaving.current) return;
        leaving.current = true;

        const go = () => router.push(href);
        const track = trackRef.current;
        const shaft = shaftRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!track || !shaft || reduceMotion || shaft.offsetWidth >= track.clientWidth - 1) {
            setExpanded(true);
            go();
            return;
        }

        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            shaft.removeEventListener("transitionend", onEnd);
            go();
        };
        const onEnd = (ev: TransitionEvent) => {
            if (ev.propertyName === "width") finish();
        };
        shaft.addEventListener("transitionend", onEnd);
        window.setTimeout(finish, FALLBACK_MS);
        setExpanded(true);
    };

    return (
        <Link
            href={href}
            className={`case-link${expanded ? " expanded" : ""}`}
            onClick={onClick}
        >
            <span className="case-link-label">Explore this project&#39;s case study</span>
            <span className="case-arrow" ref={trackRef} aria-hidden="true">
                <span className="case-arrow-shaft" ref={shaftRef}>
                    <svg className="case-arrow-head" viewBox="0 0 24 32">
                        <polyline points="4,3 20,16 4,29" />
                    </svg>
                </span>
            </span>
        </Link>
    );
}

export default CaseStudyLink;
