// One screen on a project card or detail page: the demo video when there is
// one, otherwise the filler image. Videos use the same crops as the old demo
// videos (.video-crop for phones, .web-video-crop for wide screens), so the
// play/pause control from utils/videoToggle.ts lands on them unchanged — the
// page just has to run setupVideoToggles(DEMO_VIDEO_SELECTOR) on mount.

import Image from "next/image";

export const DEMO_VIDEO_SELECTOR = ".app-video, .video";

type Props = {
    frame: "phone" | "wide";
    image: string;
    video?: string;
    alt: string;
};

function DemoMedia({ frame, image, video, alt }: Props) {
    const phone = frame === "phone";

    if (video) {
        return (
            <div className={phone ? "video-crop demo-video" : "web-video-crop demo-video"}>
                <video
                    className={phone ? "app-video" : "video"}
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
            width={phone ? 200 : 640}
            height={phone ? 410 : 400}
            unoptimized
        />
    );
}

export default DemoMedia;
