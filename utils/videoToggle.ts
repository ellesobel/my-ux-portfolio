// Adds a sheer play/pause overlay button over each demo video and wires the
// click-to-toggle behavior. Clicking the video OR the button toggles playback;
// the button's icon reflects the video's actual play/pause state and fades out
// while the video is playing (reappearing on hover).
//
// Returns a cleanup function that removes the buttons and listeners.
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
            '<svg class="video-icon play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
            '<svg class="video-icon pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
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

        video.addEventListener("click", toggle);
        button.addEventListener("click", toggle);
        video.addEventListener("play", onPlay);
        video.addEventListener("pause", onPause);

        cleanups.push(() => {
            video.removeEventListener("click", toggle);
            button.removeEventListener("click", toggle);
            video.removeEventListener("play", onPlay);
            video.removeEventListener("pause", onPause);
            button.remove();
        });
    });

    return () => cleanups.forEach((fn) => fn());
}
