import React, { useState } from "react";

export const TopBar = ({
  setCurrentTab,
}: {
  setCurrentTab: (newTab: number) => void;
}) => {
  return (
    <div className="top-bar">
      <button onClick={() => setCurrentTab(0)}>Home</button>
      <button onClick={() => setCurrentTab(1)}>About</button>
      <button onClick={() => setCurrentTab(2)}>Projects</button>
      <button onClick={() => setCurrentTab(3)}>Work</button>
    </div>
  );
};
