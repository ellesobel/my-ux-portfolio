// Previous / next arrows for the case-study modals (features and process
// images). They sit inside the modal's stage, beside the screen or image, so
// they centre on the visual rather than on the visual plus its caption.

type Props = {
    onStep: (by: number) => void;
    // What's being stepped through, for the buttons' labels ("feature", "image").
    noun: string;
};

function ModalArrows({ onStep, noun }: Props) {
    return (
        <>
            <button
                type="button"
                className="modal-arrow modal-arrow-prev"
                aria-label={`Previous ${noun}`}
                onClick={(event) => { event.stopPropagation(); onStep(-1); }}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path className="modal-arrow-outline" d="M15 4l-8 8 8 8" />
                    <path className="modal-arrow-fill" d="M15 4l-8 8 8 8" />
                </svg>
            </button>
            <button
                type="button"
                className="modal-arrow modal-arrow-next"
                aria-label={`Next ${noun}`}
                onClick={(event) => { event.stopPropagation(); onStep(1); }}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path className="modal-arrow-outline" d="M9 4l8 8-8 8" />
                    <path className="modal-arrow-fill" d="M9 4l8 8-8 8" />
                </svg>
            </button>
        </>
    );
}

export default ModalArrows;
