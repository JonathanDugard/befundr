import Link from 'next/link';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';

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

export const ProfileCreationAlert = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <p className="textStyle-body">
        Before lauching a project, you need to create your user profile
      </p>
      <Link href={'/profile/myprofile'}>
        <SecondaryButtonLabel label="Create your profile" />
      </Link>
    </div>
  );
};
