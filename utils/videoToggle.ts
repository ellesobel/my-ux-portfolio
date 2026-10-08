// Adds a play/pause overlay button over each demo video and wires the
// click-to-toggle behavior. Clicking the video OR the button toggles playback;
// the button's icon reflects the video's actual play/pause state and fades out
// while the video is playing (reappearing on hover).
//
// While the pointer rests on the video (not the button) for IDLE_MS, the crop
// is marked idle and the CSS hides the button entirely, so it doesn't sit
// over the footage being watched. Any movement wakes it again.
//
// Returns a cleanup function that removes the buttons and listeners.
const IDLE_MS = 3000;

export function setupVideoToggles(selector: string): () => void {
    const videos = Array.from(
        document.querySelectorAll<HTMLVideoElement>(selector)
    );
    const cleanups: Array<() => void> = [];

    videos.forEach((video) => {
        const crop = video.parentElement;
        if (!crop) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "video-toggle";
        button.setAttribute("aria-label", "Play video");
        button.innerHTML =
            '<svg class="video-icon play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>' +
            '<svg class="video-icon pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h5v16H5zM14 4h5v16h-5z"/></svg>';
        crop.appendChild(button);

        const toggle = () => {
            video.paused ? video.play() : video.pause();
        };
        const onPlay = () => {
            button.classList.add("playing");
            button.setAttribute("aria-label", "Pause video");
        };
        const onPause = () => {
            button.classList.remove("playing");
            button.setAttribute("aria-label", "Play video");
        };

        let idleTimer: number | undefined;
        const wake = () => {
            window.clearTimeout(idleTimer);
            crop.classList.remove("idle");
        };
        const onMove = (e: MouseEvent) => {
            wake();
            // Resting on the button itself never hides it.
            if (button.contains(e.target as Node)) return;
            idleTimer = window.setTimeout(() => crop.classList.add("idle"), IDLE_MS);
        };

        video.addEventListener("click", toggle);
        crop.addEventListener("mousemove", onMove);
        crop.addEventListener("mouseleave", wake);
        button.addEventListener("click", toggle);
        video.addEventListener("play", onPlay);
        video.addEventListener("pause", onPause);

        cleanups.push(() => {
            wake();
            video.removeEventListener("click", toggle);
            crop.removeEventListener("mousemove", onMove);
            crop.removeEventListener("mouseleave", wake);
            button.removeEventListener("click", toggle);
            video.removeEventListener("play", onPlay);
            video.removeEventListener("pause", onPause);
            button.remove();
        });
    });

    return () => cleanups.forEach((fn) => fn());
}
