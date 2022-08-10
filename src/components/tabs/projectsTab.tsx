import { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

interface project {
  name: string;
  desc: string;
  link: string;
  gitLink: string;
  imgLink: string;
}

const ProjectRender = ({ project, key }: { project: project; key: number }) => {
  return (
    <div key={key} className="project">
      {/* <div className="example-img" /> */}
      <a href={project.link} target="_blank" rel="noreferrer">
        <img src={project.imgLink} className="project-img" alt={project.name} />
      </a>
      <div className="project-desc">
        <div className="project-desc-name">{project.name}</div>
        <div className="project-desc-text">{project.desc}</div>
        <div className="project-desc-links">
          <a href={project.link} target="_blank" rel="noreferrer">
            <button className="project-icon">
              <LaunchIcon />
            </button>
          </a>
          <a href={project.gitLink} target="_blank" rel="noreferrer">
            <button className="project-icon">
              <GitHubIcon />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const ProjectsTab = ({ exit }: { exit: boolean }) => {
  const [projects, setProjects] = useState<project[]>([]);

  const getProjects = async () => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">Projects</div>
      <div className="projects-container">
        {projects.map((project, i) => (
          <ProjectRender project={project} key={i} />
        ))}
      </div>
    </div>
  );
};
