import React, { useEffect, useState } from "react";
import { BackGroundShader } from "./shaders-react/backGroundShader";
import { FractalShader } from "./shaders-react/fractalShader";

export const MainApp = ({
  currentTab,
  setCurrentTab,
  shaderToggle,
}: {
  currentTab: number;
  setCurrentTab: (newTab: number) => void;
  shaderToggle: boolean;
}) => {
  const [tab, setTab] = useState<number>(-1);
  const [exit, setExit] = useState<boolean>(false);

  const [showCursor, setShowCursor] = useState<boolean>(true);

  const [currentPos, setCurrentPos] = useState<number>(0);
  const [deleteProfession, setDeleteProfession] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");
  const [currentProfession, setCurrentProfession] = useState<number>(0);

  const [timeChange, setTimeChange] = useState<number>(0);

  useEffect(() => {
    if (timeChange <= 1) {
      // console.log(timeChange, currentTab, tab);
      const intervalID = setTimeout(() => {
        setTimeChange(timeChange + 0.01);
      }, 10);
      return () => clearInterval(intervalID);
    }
  }, [timeChange]);

  useEffect(() => {
    setExit(true);
    console.log(timeChange, currentTab, tab);
    const intervalID = setTimeout(() => {
      setExit(false);
      setTab(currentTab);
      setTimeChange(0);
    }, 250);
    return () => clearInterval(intervalID);
  }, [currentTab]);

  // Type
  useEffect(() => {
    if (currentPos < profession.length && !deleteProfession) {
      const intervalID = setTimeout(() => {
        setCurrentPos(currentPos + 1);
      }, 200);
      return () => clearInterval(intervalID);
    }
  }, [currentPos, profession, deleteProfession]);

  // Reached end
  useEffect(() => {
    const intervalID = setTimeout(() => {
      if (currentPos === profession.length) {
        setDeleteProfession(true);
      }
    }, 3000);
    return () => clearInterval(intervalID);
  }, [currentPos, profession]);

  // Delete
  useEffect(() => {
    const intervalID = setTimeout(() => {
      if (currentPos > 1 && deleteProfession) {
        setCurrentPos(currentPos - 1);
      }
      if (currentPos <= 1) {
        setDeleteProfession(false);
        switch (currentProfession) {
          case 0:
            setProfession("a Software Engineer");
            setCurrentProfession(1);
            break;
          case 1:
            setProfession("a Web Developer");
            setCurrentProfession(2);
            break;
          case 2:
            setProfession("a Graphics Programmer");
            setCurrentProfession(0);
            break;

          default:
            break;
        }
      }
    }, 200);
    return () => clearInterval(intervalID);
  }, [currentPos, currentProfession, deleteProfession, profession]);

  // Cursor
  useEffect(() => {
    const intervalID = setTimeout(() => {
      setShowCursor(!showCursor);
    }, 750);
    return () => clearInterval(intervalID);
  }, [showCursor]);

  return (
    <div className="main-app">
      {tab === 0 /* Home */ ? (
        <div className={exit ? "main-app-home-exit" : "main-app-home"}>
          <div className="title">
            Hi, I'm <span className="name">Nabil Mansour</span>
          </div>
          <div className="sub-title">
            {profession.slice(0, currentPos)}
            {profession.length !== currentPos ? (
              <span className="cursor">.</span>
            ) : showCursor ? (
              <span className="cursor">.</span>
            ) : (
              "."
            )}
          </div>
          <div className="bar">
            <button onClick={() => setCurrentTab(1)}>About</button>
            <button onClick={() => setCurrentTab(2)}>Projects</button>
            <button onClick={() => setCurrentTab(3)}>Work</button>
          </div>
        </div>
      ) : tab === 1 /* About */ ? (
        <div className={exit ? "main-app-item-exit" : "main-app-item"}>
          <div className="title">About</div>
          <div className="sub-title">about sub-title</div>
        </div>
      ) : tab === 2 /* Projects */ ? (
        <div className={exit ? "main-app-item-exit" : "main-app-item"}>
          <div className="title">Projects</div>
          <div className="sub-title">projects sub-title</div>
        </div>
      ) : tab === 3 /* Work */ ? (
        <div className={exit ? "main-app-item-exit" : "main-app-item"}>
          <div className="title">Work</div>
          <div className="sub-title">work sub-title</div>
        </div>
      ) : (
        <div className={exit ? "main-app-item-exit" : "main-app-item"}></div>
      )}

      <div className="background-shader">
        {shaderToggle ? (
          <BackGroundShader
            uniforms={{
              tab: tab,
              currentTab: currentTab,
              timeChange: timeChange,
            }}
          />
        ) : (
          <div className="background-shader-off"></div>
        )}
      </div>
    </div>
  );
};
