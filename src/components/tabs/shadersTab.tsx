import { useEffect, useState } from "react";

interface shader {
  name: string;
  codeLink: string;
  imgLink: string;
}

export const ShadersTab = ({ exit }: { exit: boolean }) => {
  const [shaders, setShaders] = useState<shader[]>([]);

  const getShaders = async () => {
    fetch("/shaders.json")
      .then((response) => response.json())
      .then((data) => {
        setShaders(data);
      });
  };

  useEffect(() => {
    getShaders();
  }, []);

  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">Shaders</div>
        <div className="shaders-container">
          {shaders.map((shader, i) => (
            <iframe
              title={shader.name}
              key={i}
              width="640"
              height="360"
              src={shader.codeLink}
            />
          ))}
        </div>
      </div>
  );
};
