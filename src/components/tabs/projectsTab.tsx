export const ProjectsTab = ({
    exit,
  }: {
    exit: boolean;
  }) => {
  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">Projects</div>
      <div className="sub-title">projects sub-title</div>
    </div>
  );
};
