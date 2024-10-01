//* MENU
type MenuProps = {
  selectedStep: number;
  setSelectedStep: (step: number) => void;
};

export const ProjectLaunchMenu = (props: MenuProps) => {
  return (
    <div className="w-full h-10 bg-second flex justify-between items-center px-4 mt-10">
      <button
        className={`${
          props.selectedStep === 0
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(0)}
      >
        Main informations
      </button>
      <button
        className={`${
          props.selectedStep === 1
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(1)}
      >
        Funding
      </button>
      <button
        className={`${
          props.selectedStep === 2
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(2)}
      >
        Rewards
      </button>
      <button
        className={`${
          props.selectedStep === 3
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(3)}
      >
        Description
      </button>
      <button
        className={`${
          props.selectedStep === 4
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(4)}
      >
        Trust
      </button>
      <button
        className={`${
          props.selectedStep === 5
            ? 'textStyle-body-accent !font-normal'
            : 'textStyle-body'
        }`}
        onClick={() => props.setSelectedStep(5)}
      >
        Validation
      </button>
    </div>
  );
};
