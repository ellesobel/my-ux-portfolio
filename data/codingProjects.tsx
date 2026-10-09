// Everything the Coding page and its feature pages show. Same shape as the
// design projects so both pages share one card; the extra fields drive the
// feature page that stands in for a case study. Images are fillers for now.

import type { DesignProject } from "./designProjects";

const BROWSER_FILLER = "/images/placeholders/browser.svg";

export type CodingProject = DesignProject & {
    stack: string[];
    // How the pieces fit together, in plain words.
    howItWorks: string[];
    challenge: { problem: string; solution: string };
    // Where code meets UX: responsiveness, accessibility, states, etc.
    uxDetails: string[];
    next: string[];
};

export const codingProjects: CodingProject[] = [
    {
        slug: "plant-log",
        title: "Plant Log",
        summary: (
            <>
                A plant journal built with React and the <em>Perenual</em> API. Search
                for a plant, add it to your garden with the date you got it and your
                own notes, and flip its card to learn about it. When a plant dies, it
                moves to the graveyard.
            </>
        ),
        media: "browser",
        image: BROWSER_FILLER,
        video: "/images/plant/plant_demo.mp4",
        features: [
            {
                name: "Live Search.",
                blurb: "Look up any plant through the Perenual API and add it in one click.",
                image: BROWSER_FILLER,
            },
            {
                name: "Flip Cards.",
                blurb: "Each plant flips to show care facts, with a Learn More view for the full description.",
                image: BROWSER_FILLER,
            },
            {
                name: "The Graveyard.",
                blurb: "Plants that didn't make it move here, notes and all.",
                image: BROWSER_FILLER,
            },
        ],
        links: [
            { label: "Live Site", href: "https://wustl-cse204a-sp2025-1.github.io/final-project-ellesobel/" },
        ],
        stack: ["React", "JavaScript", "Perenual API", "CSS"],
        howItWorks: [
            "Filler: how a search request reaches the Perenual API and comes back as cards.",
            "Filler: where the garden is stored and how adding, editing, and moving a plant update it.",
        ],
        challenge: {
            problem: "Filler: the trickiest part of building this.",
            solution: "Filler: how I solved it, and what I'd do the same way next time.",
        },
        uxDetails: [
            "Responsive for every screen wider than 375px.",
            "Filler: loading, empty, and error states for search.",
        ],
        next: ["Filler: what I'd add or change next."],
    },
    {
        slug: "image-gallery",
        title: "Flower Image Gallery",
        summary: (
            <>
                An interactive gallery of flower facts, built from scratch with HTML,
                CSS, and JavaScript — no framework. Click any flower to open it in a
                modal with its details. The layout adapts from a wide desktop grid
                down to a phone.
            </>
        ),
        media: "browser",
        image: BROWSER_FILLER,
        video: "/images/flowers/gallery_web_demo.mp4",
        features: [
            {
                name: "Modal View.",
                blurb: "Click any flower to open it large with its facts.",
                image: BROWSER_FILLER,
            },
            {
                name: "Responsive Grid.",
                blurb: "Reflows from desktop to phone for every screen wider than 375px.",
                image: BROWSER_FILLER,
            },
        ],
        links: [
            { label: "Live Site", href: "https://wustl-cse204a-sp2025-1.github.io/image-gallery-ellesobel/" },
        ],
        stack: ["HTML", "CSS", "JavaScript"],
        howItWorks: [
            "Filler: how the gallery is built from data and how the modal opens and closes.",
        ],
        challenge: {
            problem: "Filler: the trickiest part of building this.",
            solution: "Filler: how I solved it.",
        },
        uxDetails: [
            "Responsive for every screen wider than 375px.",
            "Filler: keyboard and focus handling for the modal.",
        ],
        next: ["Filler: what I'd add or change next."],
    },
];
