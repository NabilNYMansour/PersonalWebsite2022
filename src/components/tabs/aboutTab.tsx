export const AboutTab = ({
    exit,
  }: {
    exit: boolean;
  }) => {
  return (
    <div className={exit ? "main-app-item-exit" : "main-app-item"}>
      <div className="title">About</div>
      <div className="sub-title">about sub-title</div>
    </div>
  );
};
