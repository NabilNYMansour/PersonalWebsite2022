import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GestureIcon from "@mui/icons-material/Gesture";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useCallback, useState } from "react";

export const AboutTab = ({ exit }: { exit: boolean }) => {
  const [currentButton, setCurrentButton] = useState<string>("");

  const handleHovering = useCallback(
    (newButtonName: string = "") => {
      setCurrentButton(newButtonName);
    },
    [setCurrentButton]
  );

  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="about-me-title">
        About <span className="name">Me</span>
      </div>
      <div className="about-table">
        <div className="entry">
          <div className="entry-header-text">School</div>
          I'm an incoming fourth year{" "}
          <span className="name">Computer Science</span> student at
          <span className="name"> Toronto Metropolitan University</span>{" "}
          (previously Ryerson).
        </div>
        <div className="entry">
          <div className="entry-header-text">What I am Currently Learning</div>
          From the background (if on PC), you can see that I am into{" "}
          <span className="name">shaders</span>. This has been something I've
          been learning for a while as{" "}
          <span className="name">GPU programming</span> seems to be uncharted
          grounds when it comes to computer science.
        </div>
        <div className="entry">
          <div className="entry-header-text">My Interests</div>I love anything
          and everything related to computers: from{" "}
          <span className="name">low level chip design</span> to
          <span className="name">high level web applications</span>. However,
          when it comes to things other than computers, I really enjoy reading{" "}
          <span className="name">philosophy</span>, going to the{" "}
          <span className="name">gym</span>, and playing the{" "}
          <span className="name">Piano</span> every now and then.
        </div>
        <div className="entry">
          <div className="entry-header-text">What I want to Learn</div>
          Other than GPU programming, I want to slowly get into the opposite of
          that: <span className="name">Computer Vision</span>. Also on my list
          is <span className="name">Machine learning</span> which would be a
          different endeavour but equally fascinating.
        </div>
      </div>

      <div className="links">
        <div className="links-header">
          {currentButton === "" ? (
            <span className="icon-hover-off">Contacts</span>
          ) : (
            <span className="icon-hover">{currentButton}</span>
          )}
        </div>
        <div className="links-buttons">
          <a
            href="https://github.com/NabilNYMansour"
            target="_blank"
            rel="noreferrer"
          >
            <button
              onMouseEnter={() => handleHovering("GitHub")}
              onMouseLeave={() => handleHovering()}
              className="icon-large"
            >
              <GitHubIcon />
            </button>
          </a>
          <a
            href="https://www.linkedin.com/in/nnym/"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="icon-large"
              onMouseEnter={() => handleHovering("LinkedIn")}
              onMouseLeave={() => handleHovering()}
            >
              <LinkedInIcon />
            </button>
          </a>
          <a
            href="mailto:n1mansour@ryerson.ca"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="icon-large"
              onMouseEnter={() => handleHovering("Email")}
              onMouseLeave={() => handleHovering()}
            >
              <EmailIcon />
            </button>
          </a>
          <a
            href="https://www.shadertoy.com/user/chickenlegs"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="icon-large"
              onMouseEnter={() => handleHovering("ShaderToy")}
              onMouseLeave={() => handleHovering()}
            >
              <GestureIcon />
            </button>
          </a>
          <a href="NNYM_Resume_2022.pdf" target="_blank" rel="noreferrer">
            <button
              className="icon-large"
              onMouseEnter={() => handleHovering("Resume")}
              onMouseLeave={() => handleHovering()}
            >
              <ContactPageIcon />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
