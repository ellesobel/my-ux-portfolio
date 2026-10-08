//web dev projects

import { useEffect } from "react";
import ProjectCard from "../../components/projectCard";
import { DEMO_VIDEO_SELECTOR } from "../../components/demoMedia";
import { setupVideoToggles } from "../../utils/videoToggle";
import { codingProjects } from "../../data/codingProjects";

function Coding() {
    useEffect(() => setupVideoToggles(DEMO_VIDEO_SELECTOR), []);

    return (
        <div className="page design-page coding-page">
            <h2 className="page-title">Coding</h2>
            <section className="case-list" aria-label="Coding projects">
                {codingProjects.map((project, i) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        flipped={i % 2 === 1}
                        basePath="/coding"
                        linkLabel="Explore this project's features"
                    />
                ))}
            </section>
        </div>
    );
}

export default Coding;
