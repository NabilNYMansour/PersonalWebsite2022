import { useEffect, useState } from "react";
import "./App.css";
import { MainApp } from "./components/mainApp";
import { TopBar } from "./components/topBar";
import { ShaderToggleButton } from "./components/sub-components/shaderToggleButton";
import { WarningPage } from "./components/sub-components/warningPage";

function App() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [shaderToggle, setShaderToggle] = useState<boolean>(true);
  const [startMainApp, setStartMainApp] = useState<boolean>(false);
  const [turnOffShader, setTurnOffShader] = useState<boolean>(false);

  const [shaderToggleHover, setShaderToggleHover] = useState<boolean>(false);

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setStartMainApp(true);
      if (!turnOffShader) {
        setShaderToggle(true);
      }
    }, 5000);
    return () => clearInterval(intervalID);
  }, [turnOffShader]);

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
      {/* {startMainApp ? ( */}
      {true ? (
        <MainApp
          shaderToggle={shaderToggle}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ) : (
        <WarningPage
          turnOffShader={turnOffShader}
          setTurnOffShader={setTurnOffShader}
        />
      )}
    </div>
  );
}

export default App;
