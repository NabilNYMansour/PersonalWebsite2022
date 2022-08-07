import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useState } from "react";

export const WarningPage = ({
  turnOffShader,
  setTurnOffShader,
}: {
  turnOffShader: Boolean;
  setTurnOffShader: (newBool: boolean) => void;
}) => {
  const [warningContainerClass, setWarningContainerClass] =
    useState<string>("warning-container");

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setWarningContainerClass("warning-container-fade");
    }, 4500);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="warning-background">
      <div className={warningContainerClass}>
        <div className="title">This website uses shaders</div>
        <div>
          <button onClick={() => setTurnOffShader(true)}>
            Turn off? {turnOffShader && <ThumbUpAltIcon fontSize="small" />}
          </button>
        </div>
      </div>
    </div>
  );
};
