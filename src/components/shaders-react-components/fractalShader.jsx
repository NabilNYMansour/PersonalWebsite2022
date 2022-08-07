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

export const FractalShader = () => {
  const [shader, setShader] = useState("");
  const { height, width } = useWindowDimensions();

  const getShader = async () => {
    fetch("/shaders/fractal.glsl")
      .then((r) => r.text())
      .then((text) => {
        setShader(text);
      });
  };

  useEffect(() => {
    getShader();
  }, []);

  return (
    <>
      {height > width ? (
        <ShaderCanvas
          width={height / 4}
          height={height / 4}
          fragShader={shader}
        />
      ) : (
        <ShaderCanvas
          width={width / 4}
          height={width / 4}
          fragShader={shader}
        />
      )}
    </>
  );
};
