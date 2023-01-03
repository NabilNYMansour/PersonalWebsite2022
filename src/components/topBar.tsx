export const TopBar = ({
  setCurrentTab,
}: {
  setCurrentTab: (newTab: number) => void;
}) => {
  return (
      <div className="top-bar">
        <div className="bar">
          <button onClick={() => setCurrentTab(0)}>
            Home
          </button>
          <button onClick={() => setCurrentTab(1)}>
            Contacts
          </button>
          <button onClick={() => setCurrentTab(2)}>
            Projects
          </button>
          <button onClick={() => setCurrentTab(3)}>
            Shaders
          </button>
        </div>
      </div>
  );
};
