export const WorkTab = ({
    exit,
  }: {
    exit: boolean;
  }) => {
  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">Work</div>
      <div className="sub-title">work sub-title</div>
    </div>
  );
};
