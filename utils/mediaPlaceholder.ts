// Shows a shimmering placeholder in place of every image and video until it has
// actually painted, so a slow connection sees the layout taking shape instead of
// blank gaps. Anything already loaded when this runs is left alone, so nothing
// flashes a placeholder it doesn't need.
//
// Returns a cleanup function that stops observing and clears any placeholders.

const LOADING_CLASS = "media-loading";

type Media = HTMLImageElement | HTMLVideoElement;

function isPainted(el: Media): boolean {
    return el instanceof HTMLImageElement
        ? el.complete && el.naturalWidth > 0
        : el.readyState >= 2;               // HAVE_CURRENT_DATA — a frame exists
}

export function setupMediaPlaceholders(): () => void {
    const cleanups: Array<() => void> = [];
    const tracked = new WeakSet<Media>();

    const track = (el: Media) => {
        if (tracked.has(el)) return;
        tracked.add(el);
        if (isPainted(el)) return;

        el.classList.add(LOADING_CLASS);
        const done = () => el.classList.remove(LOADING_CLASS);
        // "error" clears it too — a broken image should show the normal empty
        // frame rather than shimmer forever.
        const events = el instanceof HTMLImageElement
            ? ["load", "error"]
            : ["loadeddata", "error"];

        events.forEach((name) => el.addEventListener(name, done, { once: true }));
        cleanups.push(() => {
            events.forEach((name) => el.removeEventListener(name, done));
            done();
        });
    };

    const trackWithin = (node: ParentNode) =>
        node.querySelectorAll<Media>("img, video").forEach(track);

    trackWithin(document);

    // Media that mounts later — a route change, or the art lightbox opening.
    const observer = new MutationObserver((records) => {
        records.forEach((record) => {
            record.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node instanceof HTMLImageElement || node instanceof HTMLVideoElement) {
                    track(node);
                }
                trackWithin(node);
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
        observer.disconnect();
        cleanups.forEach((fn) => fn());
    };
}
