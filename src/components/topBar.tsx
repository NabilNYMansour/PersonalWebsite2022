export const TopBar = ({
  setCurrentTab,
}: {
  setCurrentTab: (newTab: number) => void;
}) => {
  return (
      <div className="top-bar">
        <div className="bar">
          <button onClick={() => setCurrentTab(0)}>
            {/* <Link to="/">Home</Link> */}
            Home
          </button>
          <button onClick={() => setCurrentTab(1)}>
            {/* <Link to="/about">About</Link> */}
            About
          </button>
          <button onClick={() => setCurrentTab(2)}>
            {/* <Link to="/projects">Projects</Link> */}
            Projects
          </button>
          <button onClick={() => setCurrentTab(3)}>
            {/* <Link to="/shaders">Shaders</Link> */}
            Shaders
          </button>
        </div>
      </div>
  );
};
