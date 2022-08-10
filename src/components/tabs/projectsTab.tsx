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

const ProjectRender = ({ project }: { project: project }) => {
  return (
    <div className="project">
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
  const [loading, setLoading] = useState<boolean>(true);

  const getProjects = async () => {
    setLoading(true);
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">Projects</div>
      {loading ? (
        <div className="title">loading</div>
      ) : (
        <div className="projects-container">
          {projects.map((project, i) => (
            <div key={i}>
              <ProjectRender project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
