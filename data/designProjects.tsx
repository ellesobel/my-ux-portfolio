// Everything the UI & Design page and its case-study pages show, in one place,
// so the cards and the case studies can't drift apart. Images are fillers for
// now. To show a demo, add `video: "/images/<project>/demos/your_demo.mp4"` next to the image
// it replaces — the card switches to the video and its play/pause control.
// Each demo needs a still beside it with the same name as a .jpg, its poster.

import type { ReactNode } from "react";

const PHONE_FILLER = "/images/placeholders/phone.svg";

export type Feature = {
    name: string;
    blurb: string;
    image: string;
    video?: string;
    // Shown on the case-study page only, not among the card's two screens.
    hideOnCard?: boolean;
    // A watch demo gets a watch-shaped frame instead of the phone's.
    frame?: "watch";
};

export type DesignProject = {
    slug: string;
    title: string;
    // Shown under the title on research cards (role, lab, dates).
    meta?: string;
    // A square app icon shown beside the title on the card.
    logo?: string;
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
    set?: Omit<CaseFigure, "caption" | "set" | "sameScale">[];
    // The set's images all show screens at the same size (wireframes, two or
    // three screens to an image), so the modal gives them one shared height
    // instead of one shared width.
    sameScale?: boolean;
};

export type CaseSection = {
    heading: string;
    body: ReactNode;
    // Sections with figures span the full width, figures in a row under the text.
    figures?: CaseFigure[];
    // "lead" shows the first figure large, the next four in a 2 x 2 beside it,
    // for a section the images carry more than the words.
    layout?: "lead";
    // A short text section that shares its row with two others, not one.
    third?: boolean;
};

export type CaseStudy = {
    // Demo video for a hero frame over the sections; without one there is none.
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

// The music map's process sets.
const MUSIC_WIREFRAMES = [
    {
        src: "/images/music/wireframes/music_wireframe1.png",
        alt: "Wireframes of the map with colored song pins, the region filters, and song lists by location",
        width: 936,
        height: 637,
    },
    {
        src: "/images/music/wireframes/music_wireframe4.png",
        alt: "Wireframes of song labels on the map and an uptown pop-up listing its songs",
        width: 992,
        height: 637,
    },
    {
        src: "/images/music/wireframes/music_wireframe2.png",
        alt: "Wireframes of searching for nearby music, loading, and the first neon arrow direction",
        width: 937,
        height: 637,
    },
    {
        src: "/images/music/wireframes/music_wireframe3.png",
        alt: "Wireframes of the last direction and the song arrival screen with its lyric",
        width: 617,
        height: 632,
    },
];

const MUSIC_COLOR_TESTS = [
    {
        src: "/images/music/design_system/music_rejected_colors1.png",
        alt: "Two versions of the regions screen with neon buttons in different color mixes",
        width: 851,
        height: 812,
    },
    {
        src: "/images/music/design_system/music_rejected_colors2.png",
        alt: "Song list pop-ups for each region, each framed in its own neon color",
        width: 892,
        height: 921,
    },
];

export const designProjects: DesignProject[] = [
    {
        slug: "wave",
        title: "Brain-Computer Interface App",
        meta: "Solo project · Figma · Dec. 2025",
        summary: (
            <>
                <em>WAVE</em> is a speculative app for a brain chip that reads your
                thoughts. It tracks your moods and replays your dreams, all behind a
                cute, cheerful interface.
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
                            sameScale: true,
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
        meta: "Solo project · Figma · Spring 2024",
        summary: (
            <>
                <em>New York, New York</em> is a love letter to the city&#39;s music.
                It pins songs about New York to the places they sing about, then gives
                you neon directions there, so you can stand where the lyrics happen.
            </>
        ),
        media: "phones",
        // Three ways to pick a song, then the trip they all lead to.
        features: [
            {
                name: "Map.",
                blurb: "Zoom into the glowing map of Manhattan to see how songs spread across the city, and tap one to go.",
                image: PHONE_FILLER,
                video: "/images/music/demos/music_map_demo.mp4",
            },
            {
                name: "Regions.",
                blurb: "Browse by neighborhood, from Harlem to downtown, with a lyric from each song.",
                image: PHONE_FILLER,
                video: "/images/music/demos/music_region_demo.mp4",
                hideOnCard: true,
            },
            {
                name: "Near Me.",
                blurb: "Find the song closest to where you're standing and head straight there.",
                image: PHONE_FILLER,
                video: "/images/music/demos/music_nearme_demo.mp4",
                hideOnCard: true,
            },
            {
                name: "The Trip.",
                blurb: "Neon arrows count you down to the spot, then the song plays with the lyric about where you're standing.",
                image: PHONE_FILLER,
                video: "/images/music/demos/music_trip_demo.mp4",
            },
        ],
        links: [
            {
                label: "Prototype",
                href: "https://www.figma.com/proto/eONaUTtjXYfKhz1jMNbX3G/music-map?node-id=1-3327&t=8R5bDPkI1D0R0gok-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A478",
            },
        ],
        caseStudy: {
            sections: [
                {
                    heading: "The Idea",
                    body: (
                        <>
                            <p className="case-pull">A love letter to New York music.</p>
                            <p>
                                So many songs are about New York, and I thought it would
                                be cool to put them all on a map and travel to them. You
                                get to see and feel the places your favorite songs
                                describe, and maybe feel a little closer to the artists
                                too.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Feedback",
                    body: (
                        <ul>
                            <li>
                                I was using too many colors, so I narrowed the palette to
                                mostly primaries.
                            </li>
                            <li>
                                The street-sign regions didn&#39;t match the vibe, so they
                                went back to neon.
                            </li>
                            <li>
                                My buttons did similar jobs but looked totally different,
                                so now they share one style.
                            </li>
                        </ul>
                    ),
                },
                {
                    heading: "The Look",
                    body: (
                        <>
                            <p className="case-pull">Times Square at night.</p>
                            <p>
                                I went with neon and pulled colors from iconic New York
                                design, like Radio City Music Hall and the subway map. I
                                wanted the theme to feel like what the app is about: music,
                                art, and the city at night.
                            </p>
                        </>
                    ),
                    layout: "lead",
                    figures: [
                        {
                            src: "/images/music/design_system/music_inspo.png",
                            alt: "Inspiration board: Times Square at night, Radio City Music Hall's neon, the subway line colors, and a Paula Scher map",
                            width: 1182,
                            height: 861,
                            caption: "Inspiration",
                        },
                        {
                            src: "/images/music/design_system/music_theme_color.png",
                            alt: "Neon palettes on black, drawn from the subway line colors",
                            width: 722,
                            height: 635,
                            caption: "Color palette",
                        },
                        {
                            src: "/images/music/design_system/music_font_exploration.png",
                            alt: "The title, New York, New York, set in seven typefaces from neon script to block capitals",
                            width: 872,
                            height: 690,
                            caption: "Type",
                        },
                        {
                            src: "/images/music/design_system/music_arrow_inspo.png",
                            alt: "Neon arrow signs collected as inspiration for the directions screens",
                            width: 767,
                            height: 581,
                            caption: "Neon arrows",
                        },
                        {
                            src: "/images/music/design_system/music_style_development.png",
                            alt: "Glow tests: numbers at five glow strengths in several typefaces",
                            width: 790,
                            height: 555,
                            caption: "Glow tests",
                        },
                    ],
                },
                {
                    heading: "Process",
                    body: null,
                    figures: [
                        {
                            src: "/images/music/sketches/music_sketch.png",
                            alt: "First sketch of the flow: a map of Manhattan, a search for nearby music, directions, and arrival",
                            width: 1171,
                            height: 576,
                            caption: "Sketch",
                        },
                        {
                            ...MUSIC_WIREFRAMES[0],
                            caption: "Wireframes",
                            set: MUSIC_WIREFRAMES,
                            sameScale: true,
                        },
                        {
                            src: "/images/music/wireframes/music_rejected_layouts.png",
                            alt: "Four landing and region screens explored in neon, including a street-sign version of the regions",
                            width: 1202,
                            height: 627,
                            caption: "Layout explorations",
                        },
                        {
                            ...MUSIC_COLOR_TESTS[0],
                            caption: "Color explorations",
                            set: MUSIC_COLOR_TESTS,
                        },
                    ],
                },
            ],
        },
    },
    {
        slug: "pnc-redesign",
        title: "Banking App Redesign",
        meta: "Team of 3 · Figma · Fall 2025",
        summary: (
            <>
                <em>Beyond Boring</em> reimagines PNC&#39;s mobile app and Apple Watch
                experience to nudge customers toward budgeting and saving. Made with
                Andrew Pandji and Gabrielle Barthelmy.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Week to Month.",
                blurb: "A ring of the week shows which days you met your budget, overspent, or saved. Swipe to zoom out to the whole month.",
                image: "/images/bank/pnc_app_2.png",
                video: "/images/bank/demos/pnc_data_demo.mp4",
            },
            {
                name: "Smart Categorize.",
                blurb: "Swipe to tag each purchase. The charts are only as good as the data behind them.",
                image: "/images/bank/pnc_app_5.png",
                video: "/images/bank/demos/pnc_smart_categorize_demo.mp4",
            },
            {
                name: "Save the Difference.",
                blurb: "Under budget? Move what's left straight into savings from the home screen.",
                image: "/images/bank/pnc_app_1.png",
                video: "/images/bank/demos/pnc_transfer_demo.mp4",
                hideOnCard: true,
            },
            {
                name: "On the Watch.",
                blurb: "The week cycle as a quick check-in, from \u201cYou're doing great!\u201d to \u201cYou went $40 over on Thursday.\u201d",
                image: "/images/bank/demos/watch_demo.jpg",
                video: "/images/bank/demos/watch_demo.mp4",
                frame: "watch",
                hideOnCard: true,
            },
        ],
        links: [
            {
                label: "Prototype",
                href: "https://www.figma.com/proto/0GMLwccmcJZDvUO3ao0gNo/Project-1---Datafied-Experiences---Prototyping--Copy-?page-id=432%3A351&node-id=649-2176&viewport=-9480%2C1435%2C0.65&t=jJAkwCWn8aXjERSs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=649%3A474",
            },
        ],
        caseStudy: {
            sections: [
                {
                    heading: "The Problem",
                    third: true,
                    body: (
                        <>
                            <p className="case-pull">
                                PNC calls itself boring, and its app looks the part.
                            </p>
                            <p>
                                Our take: it&#39;s not about being boring, it&#39;s about being
                                smart, steady and reliable.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Goals",
                    third: true,
                    body: (
                        <ul>
                            <li>Visualize budget and spending over time.</li>
                            <li>Make saving more actionable.</li>
                            <li>Design for mobile and watch.</li>
                        </ul>
                    ),
                },
                {
                    heading: "Contributions",
                    third: true,
                    body: (
                        <ul>
                            <li>For PNC: going &ldquo;beyond boring.&rdquo;</li>
                            <li>For customers: spending as cycles you can zoom through.</li>
                            <li>For everyone: more budgeting and saving.</li>
                        </ul>
                    ),
                },
                {
                    heading: "Discovery",
                    body: (
                        <>
                            <p className="case-pull">
                                One of the themes that emerged in our discovery was
                                understanding cyclical habits.
                            </p>
                            <p>
                                Instead of &ldquo;budget categories,&rdquo; we tracked spending
                                across the week, month and year, and let people zoom in and out
                                between them. We worked on everything together; I pushed this
                                concept early on and focused most on the calendar and Smart
                                Categorize.
                            </p>
                        </>
                    ),
                    figures: [
                        {
                            src: "/images/bank/sketches_data_explorations.png",
                            alt: "Sketches of radial and flower-shaped charts for spending by day and category",
                            width: 2400,
                            height: 2708,
                            caption: "Sketches",
                        },
                        {
                            src: "/images/bank/wireframes_data_exploration.png",
                            alt: "Wireframes zooming between week, month and year views of a budget",
                            width: 2400,
                            height: 2253,
                            caption: "Data explorations",
                        },
                        {
                            src: "/images/bank/sketches_wireframes_prototypes.png",
                            alt: "Sketches, then wireframes, then the final phone and watch prototypes",
                            width: 2400,
                            height: 1348,
                            caption: "Sketches to prototypes",
                        },
                    ],
                },
                {
                    heading: "Design System",
                    body: (
                        <p>
                            PNC&#39;s blue and orange, with blue, red and green for on budget,
                            over and saved, set in Atkinson Hyperlegible for readability.
                        </p>
                    ),
                    figures: [
                        {
                            src: "/images/bank/design_system_1.png",
                            alt: "Styles and components: buttons, cards, navigation, type and brand colors",
                            width: 2400,
                            height: 1207,
                            caption: "Styles and components",
                        },
                        {
                            src: "/images/bank/design_system_2.png",
                            alt: "Data visualizations with their semantic and auxiliary colors",
                            width: 2400,
                            height: 1741,
                            caption: "Data visualizations and color",
                        },
                    ],
                },
            ],
        },
    },
];

export const researchProjects: DesignProject[] = [
    {
        slug: "synaptrack",
        title: "Human-Computer Interaction Research",
        meta: "Research Assistant · Greenberg Lab, WashU Medicine · 2025",
        logo: "/images/synaptrack/synaptrack%20logo.webp",
        summary: (
            <>
                Usability research for <em>SynapTrack</em>, an app patients with
                cervical myelopathy use at home to track their disease. I ran
                think-aloud studies with 29 participants and turned what I saw into
                UI/UX recommendations, so patients can test on their own and still
                give their doctors accurate data.
            </>
        ),
        media: "phones",
        features: [
            {
                name: "Hidden Categories.",
                blurb: "Category tabs ran off the edge of the screen, and users didn\u2019t know to scroll for more.",
                image: "/images/synaptrack/task_list.webp",
            },
            {
                name: "Missed Calendar.",
                blurb: "Asked to find upcoming tasks, users scrolled the dashboard instead of opening the calendar.",
                image: "/images/synaptrack/homepage.webp",
            },
            {
                name: "Low Contrast.",
                blurb: "Gray text on lavender: one of many contrast issues I flagged across light and dark mode.",
                image: "/images/synaptrack/sign_in.webp",
                hideOnCard: true,
            },
        ],
        caseStudy: {
            sections: [
                {
                    heading: "The Challenge",
                    body: (
                        <>
                            <p className="case-pull">
                                Patients take SynapTrack home. If they can&#39;t complete a
                                task as intended, their data is wrong.
                            </p>
                            <p>
                                That made it a unique accessibility challenge. Patterns
                                most users get through without thinking, like tabs that
                                scroll, gray helper text, or a calendar, weren&#39;t
                                intuitive for older adults with low computer
                                self-efficacy, and no doctor would be there to help.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "At a Glance",
                    body: (
                        <ul>
                            <li><strong>Role:</strong> Research assistant, running every session.</li>
                            <li><strong>Participants:</strong> 29 adults aged 40–78, on iPhone and Android.</li>
                            <li><strong>Methods:</strong> Think-aloud usability testing, retests to see whether users could self-correct, and post-task interviews.</li>
                            <li><strong>Tooling:</strong> Python scripts that simulated daily task flows, so each participant used the app as a patient would on a given day.</li>
                            <li><strong>Output:</strong> A findings report with UI/UX recommendations for the developers.</li>
                        </ul>
                    ),
                },
                {
                    heading: "Findings → Recommendations",
                    body: (
                        <>
                            <p className="case-pull">
                                &ldquo;Moving target? But they&#39;re not moving&hellip;&rdquo;
                            </p>
                            <ul className="finding-pairs">
                                {[
                                    ["Audio", "Walking with the phone away, users couldn\u2019t reread the screen. They started too soon, so the task never began, and kept walking after it ended.", "Speak the key cues: stand still to start, and stop when the task is done."],
                                    ["Haptics", "Notifications and bumps to the table were mistaken for the test\u2019s vibrations, muddying the data.", "Pause notifications for the task, and tell users to keep their hand off the table."],
                                    ["Instructions", "Users skimmed the lower-contrast subtext where the goal lived, and mistook the demo animation for the task itself.", "Numbered steps of equal weight, with the goal stated up front."],
                                    ["Visuals", "Animations didn\u2019t match the words: the wrong hand, or a different pair of fingers than the text asked for.", "Make every animation show exactly what the text says."],
                                    ["Language", "Jargon like \u201creversals\u201d and an \u201calternatively\u201d that meant \u201calternating\u201d confused users.", "Plain, consistent words: always \u201cfeel\u201d a vibration, never listen, buzz, or vibrate."],
                                    ["Contrast", "Gray text on purple, thin text in dark mode, and Android\u2019s faint nav went unnoticed.", "Larger, higher-contrast text, buttons, and navigation in both themes."],
                                ].map(([label, finding, rec]) => (
                                    <li key={label}>
                                        <span className="finding-tag">{label}</span>
                                        <p>{finding}</p>
                                        <p className="finding-rec">
                                            <span aria-label="Recommendation:">&rarr;</span> {rec}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ),
                },
            ],
        },
    },
];

export const allDesignProjects = [...designProjects, ...researchProjects];
