import ShaderCanvas from "@signal-noise/react-shader-canvas";
import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const BackGroundShader = ({
  uniforms
}) => {
  const [shader, setShader] = useState("");
  const { height, width } = useWindowDimensions();

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

  return <ShaderCanvas uniforms={uniforms} width={width} height={height} fragShader={shader} />;
};
