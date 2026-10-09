// Everything the UI & Design page and its case-study pages show, in one place,
// so the cards and the case studies can't drift apart. Images are fillers for
// now. To show a demo, add `video: "/images/your_demo.mp4"` next to the image
// it replaces — the card switches to the video and its play/pause control.

import type { ReactNode } from "react";

const PHONE_FILLER = "/images/placeholders/phone.svg";
const WIDE_FILLER = "/images/placeholders/wide.svg";

export type Feature = {
    name: string;
    blurb: string;
    image: string;
    video?: string;
};

export type DesignProject = {
    slug: string;
    title: string;
    // Shown under the title on research cards (role, lab, dates).
    meta?: string;
    summary: ReactNode;
    // App projects show two phone screens with a caption each; research shows
    // one wide image with its highlights underneath; coding projects show the
    // site in a browser window with its highlights underneath.
    media: "phones" | "wide" | "browser";
    image?: string;
    // Demo for the card's wide screen (research and coding cards).
    video?: string;
    features: Feature[];
    links?: { label: string; href: string }[];
};

export const designProjects: DesignProject[] = [
    {
        slug: "wave",
        title: "Brain-Computer Interface App",
        summary: (
            <>
                <em>WAVE</em> is a speculative design project: an assistant app for a
                government-mandated thought-surveillance system. Using bright pastels
                and playful animation, I designed the interface to make an invasive
                product feel cute and harmless.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Mood Ring.",
                blurb: "Tracks your emotions and suggests ways to regulate them.",
                image: PHONE_FILLER,
                video: "/images/moodring_demo.mp4",
            },
            {
                name: "Dreamcatcher.",
                blurb: "Records your dreams for playback and analysis.",
                image: PHONE_FILLER,
                video: "/images/dreamcatcher_demo.mp4",
            },
        ],
        links: [
            {
                label: "Prototype",
                href: "https://www.figma.com/proto/46t8dpPe2OMCsJ1bUQukFd/AVPS--Project-3?page-id=0%3A1&node-id=65-209&starting-point-node-id=65%3A209&t=mgNhD8pfZTfOgzaY-1",
            },
            {
                label: "Design Process",
                href: "https://docs.google.com/presentation/d/1dUvNiFnBwB3DS7eL5aHO9uRlULsuLQKN2ltSw_fA0fw/edit?usp=sharing",
            },
        ],
    },
    {
        slug: "nyc-music-map",
        title: "NYC Music Map App",
        summary: (
            <>
                <em>New York, New York</em> turns a song about New York City into a
                tourist destination. Choose by map, region, or random shuffle, and the
                app gives you directions to get there. I wireframed and user-tested the
                three navigation styles, then built a neon-and-arrow visual system to
                give it a city-at-night feel.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Map Nav",
                blurb: "Perfect for when you want to see the distribution of songs throughout the city.",
                image: PHONE_FILLER,
                video: "/images/map_demo.mp4",
            },
            {
                name: "Shuffle",
                blurb: "Trust the system and get directions to a mystery destination to discover a new song and a new neighborhood.",
                image: PHONE_FILLER,
            },
        ],
        links: [
            {
                label: "Prototype",
                href: "https://www.figma.com/proto/2VKtHdxEqOimViafopvew0/Eliana-Semester-Second-Half?page-id=1%3A2&node-id=295-1989&starting-point-node-id=295%3A1989&show-proto-sidebar=1&t=6mWFIjEwga52zpoi-1",
            },
        ],
    },
    {
        slug: "pnc-redesign",
        title: "Banking App Redesign",
        summary: (
            <>
                <em>PNC Mobile</em> is a redesign of PNC&#39;s banking app, made with
                Andrew Pandji and Gabrielle Barthelmy. We built a new design system,
                explored new ways to visualize account data, and made the app more
                accessible throughout.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Design System.",
                blurb: "New colors, type, and components built with accessibility in mind.",
                image: PHONE_FILLER,
                video: "/images/pnc_demo.mp4",
            },
            {
                name: "Data Views.",
                blurb: "Visualizations that make account activity readable at a glance.",
                image: PHONE_FILLER,
            },
        ],
        links: [
            {
                label: "Prototype",
                href: "https://www.figma.com/proto/0GMLwccmcJZDvUO3ao0gNo/Project-1---Datafied-Experiences---Prototyping--Copy-?page-id=432%3A351&node-id=649-2176&viewport=-9480%2C1435%2C0.65&t=jJAkwCWn8aXjERSs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=649%3A474",
            },
        ],
    },
];

export const researchProjects: DesignProject[] = [
    {
        slug: "synaptrack",
        title: "Human-Computer Interaction Research",
        meta: "The Greenberg Lab · WashU Medicine Neurosurgery · Jun.–Dec. 2025",
        summary: (
            <>
                As a research assistant on <em>SynapTrack</em>, a clinical interface, I
                ran usability studies with older adult patients and turned what I saw
                into UI/UX recommendations. I worked with developers to reduce
                cognitive load and make the interface clearer for users with motor or
                sensory impairments.
            </>
        ),
        media: "wide",
        image: WIDE_FILLER,
        features: [
            {
                name: "Usability Studies.",
                blurb: "~35 older adult patients; interaction patterns, accessibility barriers, and workflow bottlenecks.",
                image: WIDE_FILLER,
            },
            {
                name: "Research Protocols.",
                blurb: "Interview guides, observational protocols, and structured task flows.",
                image: WIDE_FILLER,
            },
            {
                name: "Python Tooling.",
                blurb: "Scripts that generate daily task lists to streamline testing sessions.",
                image: WIDE_FILLER,
            },
        ],
    },
];

export const allDesignProjects = [...designProjects, ...researchProjects];
