import { useState } from "react";
import "./App.css";
import { MainApp } from "./components/mainApp";
import { TopBar } from "./components/topBar";
import { ShaderToggleButton } from "./components/sub-components/shaderToggleButton";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [shaderToggle, setShaderToggle] = useState<boolean>(true);

  const [shaderToggleHover, setShaderToggleHover] = useState<boolean>(false);

  const isPhone = useMediaQuery("(pointer:none), (pointer:coarse)");

  return (
    <div>
      {/* Shader on of toggle */}
      <ShaderToggleButton
        shaderToggle={shaderToggle}
        setShaderToggle={setShaderToggle}
        shaderToggleHover={shaderToggleHover}
        setShaderToggleHover={setShaderToggleHover}
      />

      {/* Top bar */}
      {currentTab > 0 && <TopBar setCurrentTab={setCurrentTab} />}

      {/* Main App or Shader Warning */}
      <MainApp
        shaderToggle={shaderToggle}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isPhone={isPhone}
      />
    </div>
  );
}

export default App;
