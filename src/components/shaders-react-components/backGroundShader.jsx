import ShaderCanvas from "@signal-noise/react-shader-canvas";
import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const BackGroundShader = ({ shaderToggle, tabQueue, setTabQueue }) => {
  const [shader, setShader] = useState("");
  const { height, width } = useWindowDimensions();
  const [timeChange, setTimeChange] = useState(0);
  const [currentTabInQueue, setCurrentTabInQueue] = useState(0);
  const [previousTabInQueue, setPreviousTabInQueue] = useState(0);

  const getShader = async () => {
    fetch("/shaders/backGroundShader.glsl")
      .then((r) => r.text())
      .then((text) => {
        setShader(text);
      });
  };

  useEffect(() => {
    getShader();
  }, []);

  // Trial and Error frankly, it works tho :)
  useEffect(() => {
    if (timeChange <= 1) {
      const intervalID = setTimeout(() => {
        setTimeChange(timeChange + 0.01);
      }, 10);
      return () => clearInterval(intervalID);
    } else if (tabQueue.length > 0) {
      setPreviousTabInQueue(currentTabInQueue);
      setCurrentTabInQueue(tabQueue[tabQueue.length - 1]);
      setTabQueue([...tabQueue].slice(0, tabQueue.length - 1));
      setTimeChange(0);
    }
  }, [timeChange, tabQueue]);

  useEffect(() => {
    if (tabQueue.length >= 2) {
      setTabQueue([...tabQueue].slice(0, tabQueue.length - 1));
    }
    console.log(tabQueue);
  }, [tabQueue]);

  return (
    <div className="shader-background">
      {shaderToggle && (
        <div className="shader">
          <ShaderCanvas
            uniforms={{
              currentTab:currentTabInQueue,
              previousTab:previousTabInQueue,
              timeChange:timeChange
            }}
            width={width}
            height={height}
            fragShader={shader}
          />
        </div>
      )}
    </div>
  );
};
