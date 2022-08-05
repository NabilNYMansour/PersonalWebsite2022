import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { MainApp } from "./components/mainApp";
import { TopBar } from "./components/topBar";
import BrushIcon from "@mui/icons-material/Brush";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function App() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [shaderToggle, setShaderToggle] = useState<boolean>(false);
  const [startMainApp, setStartMainApp] = useState<boolean>(false);
  const [turnOffShader, setTurnOffShader] = useState<boolean>(false);
  const [warningContainerClass, setWarningContainerClass] =
    useState<string>("warning-container");

  const handleShaderToggle = useCallback(() => {
    setShaderToggle(!shaderToggle);
  }, [shaderToggle, setShaderToggle]);

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setStartMainApp(true);
      if (!turnOffShader) {
        setShaderToggle(true);
      }
    }, 5000);
    return () => clearInterval(intervalID);
  }, [turnOffShader]);

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setWarningContainerClass("warning-container-fade");
    }, 4500);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <button className="shader-toggle" onClick={handleShaderToggle}>
        <BrushIcon />
      </button>
      {currentTab > 0 && <TopBar setCurrentTab={setCurrentTab} />}
      {startMainApp ? (
        <MainApp
          shaderToggle={shaderToggle}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ) : (
        <div className="warning-background">
          <div className={warningContainerClass}>
            <div className="title">This website uses shaders</div>
            <div>
              <button onClick={() => setTurnOffShader(true)}>Turn off? {turnOffShader && <ThumbUpAltIcon fontSize="small"/>}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
