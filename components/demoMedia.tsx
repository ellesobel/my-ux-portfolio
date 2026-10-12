// One screen on a project card or detail page: the demo video when there is
// one, otherwise the filler image. Videos use the same crops as the old demo
// videos (.video-crop for phones, .web-video-crop for wide screens), so the
// play/pause control from utils/videoToggle.ts lands on them unchanged — the
// page just has to run setupVideoToggles(DEMO_VIDEO_SELECTOR) on mount.
//
// Phone demos come in two shapes. Screen-only recordings (portrait) fill the
// phone frame as they are. The older landscape recordings have the phone in
// the middle of a wide frame, so they're marked .landscape once their size is
// known and the CSS zooms in on the phone.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const DEMO_VIDEO_SELECTOR = ".app-video, .video";

type Props = {
    frame: "phone" | "wide";
    image: string;
    video?: string;
    alt: string;
};

function DemoMedia({ frame, image, video, alt }: Props) {
    const phone = frame === "phone";
    const videoRef = useRef<HTMLVideoElement>(null);
    const [landscape, setLandscape] = useState(false);
    const checkShape = () => {
        const el = videoRef.current;
        if (el && el.readyState >= 1) setLandscape(el.videoWidth > el.videoHeight);
    };
    // The metadata may arrive before hydration attaches the listener below.
    useEffect(checkShape, [video]);

    if (video) {
        return (
            <div className={phone ? "video-crop demo-video" : "web-video-crop demo-video"}>
                <video
                    ref={videoRef}
                    className={phone ? `app-video${landscape ? " landscape" : ""}` : "video"}
                    onLoadedMetadata={checkShape}
                    aria-label={alt}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        );
    }

    return (
        <Image
            className={phone ? "phone-img" : "wide-img"}
            src={image}
            alt={alt}
            width={phone ? 401 : 640}
            height={phone ? 861 : 400}
            unoptimized
        />
    );
}

export default DemoMedia;
