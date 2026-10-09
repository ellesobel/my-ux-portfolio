// Everything the UI & Design page and its case-study pages show, in one place,
// so the cards and the case studies can't drift apart. Images are fillers for
// now. To show a demo, add `video: "/images/<project>/demos/your_demo.mp4"` next to the image
// it replaces — the card switches to the video and its play/pause control.

import type { ReactNode } from "react";

const PHONE_FILLER = "/images/placeholders/phone.svg";
const WIDE_FILLER = "/images/placeholders/wide.svg";

export type Feature = {
    name: string;
    blurb: string;
    image: string;
    video?: string;
    // Shown on the case-study page only, not among the card's two screens.
    hideOnCard?: boolean;
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
    // The written-up case study. Projects without one show filler sections.
    caseStudy?: CaseStudy;
};

export type CaseFigure = {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    // A whole set of images (all the sketches, all the wireframes). The figure
    // itself is the cover shown in the overview; opening it shows the set as a
    // grid, and any image in the grid can be opened large.
    set?: Omit<CaseFigure, "caption" | "set">[];
};

export type CaseSection = {
    heading: string;
    body: ReactNode;
    // Sections with figures span the full width, figures in a row under the text.
    figures?: CaseFigure[];
};

export type CaseStudy = {
    // Demo video for the hero frame; without one the hero shows the filler.
    heroVideo?: string;
    sections: CaseSection[];
};

// WAVE's process sets, rough to refined. The overview shows one of each as a
// cover; the modal shows the whole set.
const WAVE_SKETCHES = [
    {
        src: "/images/wave/sketches/wave_sketch.png",
        alt: "Hand-drawn sketch of the home and settings screens",
        width: 956,
        height: 712,
    },
    {
        src: "/images/wave/sketches/wave_sketch_faces.png",
        alt: "Sketches of the emotion faces, from angry to happy",
        width: 1196,
        height: 441,
    },
    {
        src: "/images/wave/sketches/wave_sketch_shapes.png",
        alt: "Sketches of the bubbly and spiky shapes behind the moods",
        width: 705,
        height: 802,
    },
];

const WAVE_WIREFRAMES = [
    {
        src: "/images/wave/wireframes/wave_wireframe1.png",
        alt: "First wireframe: two screens of stacked organic shapes",
        width: 672,
        height: 680,
    },
    {
        src: "/images/wave/wireframes/wave_wireframe2.png",
        alt: "Home screen wireframe with mood, sleep and close friends shapes",
        width: 752,
        height: 762,
    },
    {
        src: "/images/wave/wireframes/wave_wireframe_color.png",
        alt: "Wireframes in color, with pastel gradients and purple shapes",
        width: 747,
        height: 757,
    },
    {
        src: "/images/wave/wireframes/wave_wireframe_final.png",
        alt: "Final grayscale wireframes of the mood screen in three moods",
        width: 1112,
        height: 750,
    },
];

export const designProjects: DesignProject[] = [
    {
        slug: "wave",
        title: "Brain-Computer Interface App",
        meta: "Solo project · Figma · Dec. 2025",
        summary: (
            <>
                <em>WAVE</em> is the app for a brain chip the government makes
                mandatory for anyone over 18, so it can record our thoughts.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Home.",
                blurb: "Reads what's on your mind and suggests what to do about it, with quick actions and a glance at your mood, dreams, and friends.",
                image: PHONE_FILLER,
                video: "/images/wave/demos/wave_home_demo.mp4",
                // The overview of the app: leads the case study, while the
                // card spends its two phones on individual features.
                hideOnCard: true,
            },
            {
                name: "Moodring.",
                blurb: "Tracks your emotions and suggests ways to regulate them.",
                image: PHONE_FILLER,
                video: "/images/wave/demos/moodring_demo.mp4",
            },
            {
                name: "Dreamcatcher.",
                blurb: "Records your dreams for playback and analysis.",
                image: PHONE_FILLER,
                video: "/images/wave/demos/dreamcatcher_demo.mp4",
            },
            {
                name: "Settings.",
                blurb: "Every feature is on by default, and each one can be switched off, giving users a sense of control over an invasive system.",
                image: PHONE_FILLER,
                video: "/images/wave/demos/settings_demo.mp4",
                // Last on the case study, where it reframes everything before
                // it; the card keeps its two most striking screens.
                hideOnCard: true,
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
        caseStudy: {
            heroVideo: "/images/wave/demos/brainchip_demo.mp4",
            sections: [
                {
                    heading: "The Premise",
                    body: (
                        <>
                            <p className="case-pull">
                                What if our thoughts were being surveilled?
                            </p>
                            <p>
                                The government claims they won&#39;t be listening, unless
                                they have reason to.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Design Choice",
                    body: (
                        <>
                            <p className="case-pull">
                                I want users to be so distracted that they forget how
                                creepy it is.
                            </p>
                            <p>
                                Bright colors and cute motifs make it look gilded and
                                perfect, but something is deeply wrong.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Process",
                    body: null,
                    figures: [
                        {
                            src: "/images/wave/wave_journey_map.png",
                            alt: "User journey map across four stages, from getting the implant to enjoying the app",
                            width: 1116,
                            height: 695,
                            caption: "User journey map",
                        },
                        {
                            ...WAVE_SKETCHES[0],
                            caption: "Sketches",
                            set: WAVE_SKETCHES,
                        },
                        {
                            ...WAVE_WIREFRAMES[1],
                            caption: "Wireframes",
                            set: WAVE_WIREFRAMES,
                        },
                        {
                            src: "/images/wave/moodboard.jpg",
                            alt: "Mood board pairing surveillance imagery with pastel gradients and color swatches",
                            width: 2160,
                            height: 1120,
                            caption: "Mood board",
                        },
                    ],
                },
            ],
        },
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
                video: "/images/music/map_demo.mp4",
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
                video: "/images/bank/pnc_demo.mp4",
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
