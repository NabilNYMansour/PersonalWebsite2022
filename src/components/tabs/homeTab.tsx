import { useEffect, useState } from "react";

export const HomeTab = ({
  exit,
  setCurrentTab,
}: {
  exit: boolean;
  setCurrentTab: (newTab: number) => void;
}) => {
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [currentPos, setCurrentPos] = useState<number>(0);
  const [deleteProfession, setDeleteProfession] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");
  const [currentProfession, setCurrentProfession] = useState<number>(0);

  // Type
  useEffect(() => {
    if (currentPos < profession.length && !deleteProfession) {
      const intervalID = setTimeout(() => {
        setCurrentPos(currentPos + 1);
      }, 150);
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
            setProfession("a Graphics Programmer");
            setCurrentProfession(1);
            break;
          case 1:
            setProfession("a Web Developer");
            setCurrentProfession(2);
            break;
          case 2:
            setProfession("a Software Engineer");
            setCurrentProfession(0);
            break;
          default:
            break;
        }
      }
    }, 150);
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
    <div className={exit ? "main-app-home-exit" : "main-app-home"}>
      <div className="title">
        Hi, I'm <span className="name">Nabil Mansour</span>
      </div>
      <div className="sub-title">
        {profession.slice(0, currentPos)}
        {profession.length !== currentPos ? (
          <span className="cursor-on">&nbsp;</span>
        ) : showCursor ? (
          <span className="cursor-on">&nbsp;</span>
        ) : (
          <span className="cursor-off">&nbsp;</span>
        )}
      </div>
      <div className="bar">
        <button onClick={() => setCurrentTab(1)}>About</button>
        <button onClick={() => setCurrentTab(2)}>Projects</button>
        <button onClick={() => setCurrentTab(3)}>Shaders</button>
      </div>
    </div>
  );
};
