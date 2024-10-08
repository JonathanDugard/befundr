'use client';

import { useMemo, useState } from 'react';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Divider from '../z-library/display_elements/Divider';
import RewardCardCreation from '../z-library/card/RewardCardCreation';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../z-library/button/InputField';
import TextArea from '../z-library/button/TextArea';
import ToggleButton from '../z-library/button/ToggleButton';
import PicSelector from '../z-library/button/PicSelector';
import AlertInfoLabel from '../z-library/display_elements/AlertInfoLabel';

type RewardsProps = {
  handleAddReward: (reward: Reward) => void;
  handleUpdateReward: (updatedReward: Reward) => void;
  handleRemoveReward: (rewardId: string) => void;
  projectToCreate: Project;
};

export const RewardsBlock = (props: RewardsProps) => {
  //* LOCAL STATE
  const [isAddReward, setIsAddReward] = useState(false);
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 3: Contribution Rewards</h3>
      <p className="textStyle-subheadline -mt-4">
        Define between one to four rewards
      </p>
      {!isAddReward && (
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <button
            onClick={() => setIsAddReward(true)}
            className="mb-6"
            disabled={props.projectToCreate.rewards.length >= 4}
          >
            <MainButtonLabel
              label="Add a reward level"
              disabled={props.projectToCreate.rewards.length >= 4}
            />
          </button>
          <Divider />
          {props.projectToCreate.rewards.map((reward: Reward, index) => (
            <div key={index} className="w-full flex flex-col gap-8 mt-4">
              <RewardCardCreation
                reward={reward}
                onEdit={() => props.handleUpdateReward(reward)}
                onDelete={() => props.handleRemoveReward(reward.id)}
              />
              <Divider />
            </div>
          ))}
        </div>
      )}
      {isAddReward && (
        <AddRewardBlock
          handleAddReward={props.handleAddReward}
          projectToCreate={props.projectToCreate}
          handleClose={() => setIsAddReward(false)}
        />
      )}
    </div>
  );
};

type AddRewardProps = {
  handleAddReward: (reward: Reward) => void;
  projectToCreate: Project;
  handleClose: () => void;
};
export const AddRewardBlock = (props: AddRewardProps) => {
  const [rewardToCreate, setRewardToCreate] = useState<Reward>({
    id: uuidv4(),
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    currentSupply: 0,
    maxSupply: null,
    isAvailable: false,
  });
  const [rewardImageUrl, setRewardImageUrl] = useState<File | null>(null);
  const [isIllimitedSupply, setIsIllimitedSupply] = useState(false);

  // handle project input field modifications
  const handleRewardChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setRewardToCreate((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // handle reward pic modification
  const handleRewardPicChange = (file: File | null) => {
    if (file) {
      setRewardImageUrl(file);

      const imageUrl = URL.createObjectURL(file);
      setRewardToCreate((prevProject) => ({
        ...prevProject,
        imageUrl: imageUrl,
        imageFile: file,
      }));
    }
  };

  const allInfoSetted = useMemo(() => {
    if (
      !rewardToCreate.name ||
      !rewardToCreate.description ||
      !rewardToCreate.imageUrl ||
      (!isIllimitedSupply &&
        (rewardToCreate.maxSupply === null || rewardToCreate.maxSupply <= 0))
    ) {
      return false;
    } else {
      return true;
    }
  }, [rewardToCreate]);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-1/2">
      <p className="textStyle-subheadline">Create a new reward level</p>
      <InputField
        label="Reward name"
        placeholder="Set the reward name"
        type="text"
        handleChange={handleRewardChange}
        inputName="name"
        value={rewardToCreate.name}
        max={64}
      />
      <InputField
        label="Required contribution amount in $"
        placeholder="Set the amount in $"
        type="number"
        handleChange={handleRewardChange}
        inputName="price"
        value={rewardToCreate.price}
      />
      <TextArea
        label="Description"
        placeholder="Describe the reward"
        rows={5}
        value={rewardToCreate.description}
        handleChange={handleRewardChange}
        inputName="description"
        max={100}
      />
      <InputField
        label="Supply"
        placeholder="Set the supply of the reward"
        type="number"
        handleChange={handleRewardChange}
        inputName="maxSupply"
        value={rewardToCreate.maxSupply || 0}
        isDisabled={isIllimitedSupply}
      />
      <div className="flex justify-start gap-2">
        <p className="textStyle-body">Illimited supply</p>
        <button
          onClick={() => {
            setIsIllimitedSupply(!isIllimitedSupply);
            setRewardToCreate((prevProject) => ({
              ...prevProject,
              maxSupply: null,
            }));
          }}
        >
          <ToggleButton isSelected={isIllimitedSupply} />
        </button>
      </div>
      <PicSelector
        label="Reward image"
        placeholder="Select the reward image"
        setSelectedPic={handleRewardPicChange}
        maxSize={2}
        objectFit="cover"
        defaultImage={rewardToCreate.imageUrl}
      />
      <div className="flex justify-start items-start gap-4">
        <button
          onClick={() => {
            props.handleAddReward(rewardToCreate);
            props.handleClose();
          }}
          disabled={!allInfoSetted}
        >
          <MainButtonLabel label="Add the reward" disabled={!allInfoSetted} />
        </button>
        {/* alert if missing info */}
        {!allInfoSetted && <AlertInfoLabel label="Missing information" />}
      </div>
    </div>
  );
};
