'use client';
//* MENU

import { categories } from '@/data/localdata';
import Selector from '../z-library/button/Selector';
import InputField from '../z-library/button/InputField';
import PicSelector from '../z-library/button/PicSelector';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useState } from 'react';
import ToggleButton from '../z-library/button/ToggleButton';
import TextArea from '../z-library/button/TextArea';
import Image from 'next/image';
import { FaRegIdCard } from 'react-icons/fa';
import Slider from '../z-library/button/Slider';
import TrustScore from '../z-library/display elements/TrustScore';

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

//* STEP BLOCKS

export const MainInfoBlock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 1 : main informations</h3>
      <InputField
        label="Project name"
        placeholder="Your project name"
        type="text"
      />
      <Selector
        label="Category"
        options={categories}
        onChange={(value) => {}}
      />
      <PicSelector
        label="Main image"
        placeholder="Select your project main image"
        setSelectedPic={() => {}}
      />
    </div>
  );
};

export const FundingBlock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 2 : Funding informations</h3>
      {/* <InputField
        label="Funding campain starting date"
        placeholder="Pick the starting date"
        type="date"
      />
      <InputField
        label="Funding campain duration"
        placeholder="Select the duration (recommanded between 28 and 42 days)"
        type="number"
      />
      <p className="textStyle-body text-right -mt-4 w-full">
        endind date : to calcul
      </p>
      <InputField
        label="Funding goal in $"
        placeholder="Set the total targeted amount in $"
        type="number"
      /> */}
    </div>
  );
};

export const RewardsBlock = () => {
  //* LOCAL STATE
  const [isAddReward, setIsAddReward] = useState(false);
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 3 : Contribution rewards</h3>
      {!isAddReward && (
        <button onClick={() => setIsAddReward(true)}>
          <MainButtonLabel label="Add a reward level" />
        </button>
      )}
      {isAddReward && <AddRewardBlock />}
    </div>
  );
};

export const AddRewardBlock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <p className="textStyle-subheadline">Create a new reward level</p>
      <InputField
        label="Reward name"
        placeholder="Set the reward name"
        type="text"
      />
      <InputField
        label="Required contribution amount in $"
        placeholder="Set the amount in $"
        type="number"
      />
      <InputField
        label="Supply"
        placeholder="Set the supply of the reward"
        type="number"
      />
      <div className="flex justify-start gap-2">
        <p className="textStyle-body">Illimited supply</p>
        <ToggleButton />
      </div>
      <PicSelector
        label="Reward image"
        placeholder="Select the reward image"
        setSelectedPic={() => {}}
      />
    </div>
  );
};

export const DescriptionBLock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 4 : Detailed description</h3>
      <TextArea
        label="Detailled description of your project"
        placeholder="Bring as more detail as possible"
        rows={5}
      />
      <PicSelector
        label="Upload another image to illustrate your project (optionnal)"
        placeholder="Select an image"
        setSelectedPic={() => {}}
      />
    </div>
  );
};

export const TrustBlock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 5 : Trustworthiness elements</h3>
      {/* verifeid info */}
      <p className="textStyle-subheadline !text-textColor-main">
        Your verified informations
      </p>
      <p className="textStyle-subheadline">
        Befundr is based on confidance. The more informations you provide, the
        more contributors will trust you and your project.
      </p>
      <div className="flex justify-start gap-2">
        <Image
          alt="x"
          src={'/x.jpg'}
          width={30}
          height={30}
          className="rounded-full"
        />
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      <div className="flex justify-start gap-2">
        <FaRegIdCard size={30} className="text-textColor-main" />
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      <div className="flex justify-start items-center gap-2">
        <p className="textStyle-body !text-black">DID profile status</p>
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      {/* safety deposit */}
      <p className="textStyle-subheadline !text-textColor-main mt-10">
        Safety deposit
      </p>
      <p className="textStyle-body">
        A minimum amount of 50$ is needed to start a funding campain. These
        funds are escrowed to show your personal engagement in the project and
        to promote legitimate project. With funds will get back to you if the
        project is cancelled due to lack of initial contributions or when the
        project is successfull.
        <br />
        In case of non delivery of the rewards expected for your project, these
        funds will be used to refund contributors.
        <br /> You can set an amount superior to 50$. It will insure
        contributors of your engagement
      </p>
      <div className="flex justify-start items-center gap-2 w-full">
        <Slider
          initValue={50}
          max={10000}
          min={50}
          step={1}
          onChange={() => {}}
        />
        <p className="w-1/2">x % of your fundraising target.</p>
      </div>
      {/* trust score */}
      <p className="textStyle-subheadline !text-textColor-main mt-10 mb-4">
        Final trust score
      </p>
      <div className=" flex justify-center items-center gap-4 w-full">
        <div className="h-52 aspect-square flex flex-col justify-center items-center gap-2">
          <TrustScore trustValue={70} />
          <p className="textStyle-headline">Level X</p>
        </div>
        <p className="textStyle-body border border-accent rounded-md p-2">
          Aggregated trust level that will be displayed to contributors. An
          higher score is better{' '}
        </p>
      </div>
    </div>
  );
};

export const ValidationBlock = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 6 : Project launch validation</h3>
      {/* verifeid info */}
      <p className="textStyle-subheadline !text-textColor-main">
        Check the informations you provided before launching your project
      </p>
      <p className="textStyle-subheadline">
        This is the final step and the project will be immediatly launched after
        your validation. Please take all the time needed to review the
        informations provided.
      </p>
    </div>
  );
};
