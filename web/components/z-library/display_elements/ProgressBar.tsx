type Props = {
  goalAmount: number;
  currentAmount: number;
};

const ProgressBar = (props: Props) => {
  return (
    <div className="w-full bg-second z-0 rounded-full h-2">
      <div
        className="bg-accent h-2 rounded-full"
        style={{
          width: `${Math.min(
            (props.currentAmount * 100) / props.goalAmount,
            100
          )}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
