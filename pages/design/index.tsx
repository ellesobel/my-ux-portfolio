//figma projects

import ProjectCard from "../../components/projectCard";
import { designProjects, researchProjects } from "../../data/designProjects";

function Design() {
    return (
        <div className="page design-page">
            <h2 className="page-title">Designs</h2>
            <section className="case-list" aria-label="Design projects">
                {designProjects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} flipped={i % 2 === 1} />
                ))}
            </section>

            <h2 className="case-section-title">Research</h2>
            <section className="case-list" aria-label="Research">
                {researchProjects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} flipped={i % 2 === 1} />
                ))}
            </section>
        </div>
    );
}

export default Design;
