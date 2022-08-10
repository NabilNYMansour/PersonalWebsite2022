import { useEffect, useState } from "react";
import { BackGroundShader } from "./shaders-react-components/backGroundShader";
import { AboutTab } from "./tabs/aboutTab";
import { HomeTab } from "./tabs/homeTab";
import { ProjectsTab } from "./tabs/projectsTab";
import { ShadersTab } from "./tabs/shadersTab";

export const MainApp = ({
  currentTab,
  setCurrentTab,
  shaderToggle,
  isPhone,
}: {
  currentTab: number;
  setCurrentTab: (newTab: number) => void;
  shaderToggle: boolean;
  isPhone: boolean;
}) => {
  // Current tab changes
  const [tab, setTab] = useState<number>(0);
  const [exit, setExit] = useState<boolean>(false);

  // First initializer
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // GLSL uniform changes
  const [tabQueue, setTabQueue] = useState<number[]>([]);

  useEffect(() => {
    setHasStarted(true);
    console.log(isPhone);
  }, []);

  useEffect(() => {
    if (hasStarted) {
      setExit(true);
      const intervalID = setTimeout(() => {
        setExit(false);
        setTab(currentTab);
        setTabQueue([currentTab, ...tabQueue]);
      }, 250);
      return () => clearInterval(intervalID);
    }
  }, [currentTab]);

  return (
    <div>
        {tab === 0  ? (
          <HomeTab exit={exit} setCurrentTab={setCurrentTab} />
        ) : tab === 1  ? (
          <AboutTab exit={exit} />
        ) : tab === 2  ? (
          <ProjectsTab exit={exit} />
        ) : tab === 3  ? (
          <ShadersTab exit={exit} />
        ) : (
          <div className={exit ? "main-app-item-exit" : "main-app-item"}>
            NO TAB SELECTED
          </div>
        )}

      {/* Background shader */}
      <BackGroundShader
        shaderToggle={shaderToggle}
        tabQueue={tabQueue}
        setTabQueue={setTabQueue}
      />
    </div>
  );
};