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
      <div className="links">
        <div className="title">
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
