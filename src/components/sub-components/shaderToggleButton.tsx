import { useCallback } from "react";
import BrushIcon from "@mui/icons-material/Brush";

export const ShaderToggleButton = ({
  shaderToggle,
  setShaderToggle,
  shaderToggleHover,
  setShaderToggleHover,
}: {
  shaderToggle: boolean;
  setShaderToggle: (newBool: boolean) => void;
  shaderToggleHover: boolean;
  setShaderToggleHover: (newBool: boolean) => void;
}) => {
  const handleShaderToggle = useCallback(() => {
    setShaderToggle(!shaderToggle);
  }, [shaderToggle, setShaderToggle]);

  return (
    <div className="shader-button">
      <button
        onMouseEnter={() => setShaderToggleHover(true)}
        onMouseLeave={() => setShaderToggleHover(false)}
        className="icon"
        onClick={handleShaderToggle}
      >
        <BrushIcon />
      </button>
      {shaderToggleHover && (
        <div className="icon-hover">
          {shaderToggle ? "shader ON" : "shader OFF"}
        </div>
      )}
    </div>
  );
};
