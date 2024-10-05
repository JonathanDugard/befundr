'use client';
import React, { useEffect, useState } from 'react';
import Divider from '../z-library/display elements/Divider';
import { useRouter } from 'next/navigation';
import BackButton from '../z-library/button/BackButton';
import { ProfileCreationAlert, ProjectLaunchMenu } from './launchproject-ui';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { MainInfoBlock } from './mainInfo-ui';
import { FundingBlock } from './funding-ui';
import { RewardsBlock } from './rewards-ui';
import { DescriptionBLock } from './description-ui';
import { TrustBlock } from './trust-ui';
import { ValidationBlock } from './validation-ui';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import { ProjectCategory } from '@/data/category';
import Link from 'next/link';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import { getATA } from '@/utils/functions/AtaFunctions';
import { useBefundrProgramGlobal } from '../befundrProgram/befundr-global-access';
import { prepareDataForProjectCreation } from './utils';

const Launchproject = () => {
  //* GENERAL STATE
  const router = useRouter();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useBefundrProgramGlobal();
  const { createProject } = useBefundrProgramProject();
  const {
    userAccountFromAccountPublicKey,
    userAccountFromWalletPublicKey,
    getUserPdaPublicKey: getUserEntryAddress,
    getUserWalletATABalance,
  } = useBefundrProgramUser();

  //* LOCAL STATE
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [projectToCreate, setProjectToCreate] = useState<Project>({
    // init with an empty project
    owner: '',
    user: '',
    name: '',
    category: ProjectCategory.Technology,
    imageUrl: '',
    description: '',
    goalAmount: 0,
    raisedAmount: 0,
    timestamp: Date.now(),
    endTime: 30, // expressed in nb of days in the UI. To be convert in timestamp before the creation tx
    status: 'Draft',
    contributionCounter: 0,
    trustScore: 75, //between 75 to 100
    rewards: [],
    safetyDeposit: 50,
    xAccountUrl: '',
  });
  const [projectImageUrl, setProjectImageUrl] = useState<File | null>(null);
  const [displayedSelectedCategory, setDisplayedSelectedCategory] =
    useState('Technology');
  const [isCreationLoading, setIsCreationLoading] = useState(false);

  const [userProjectCounter, setUserProjectCounter] = useState(0);

  //* USER DATA MNGT
  // Use React Query to fetch userPDA address based on public key
  const { data: userEntryAddress, isLoading: isFetchingUserEntryAddress } =
    getUserEntryAddress(publicKey);

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromWalletPublicKey(publicKey);

  // Handle profile data after fetching
  useEffect(() => {
    if (userProfile) {
      setUserProjectCounter(userProfile.createdProjectCounter);
    }
  }, [userProfile]);

  //* PROJECT DATA MNGT
  // handle project input field modifications
  const handleProjectChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // handle date type to keep a timestamp format
    const finalValue = type === 'date' ? new Date(value).getTime() : value;

    setProjectToCreate((prevProfile) => ({
      ...prevProfile,
      [name]: finalValue,
    }));
  };

  // handle profile pic modification
  const handleProjectPicChange = (file: File | null) => {
    if (file) {
      setProjectImageUrl(file);

      const imageUrl = URL.createObjectURL(file);
      setProjectToCreate((prevProject) => ({
        ...prevProject,
        imageUrl: imageUrl,
      }));
    }
  };

  // Handle category change managing serialization and deserialization to allow manipulate Enum
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setDisplayedSelectedCategory(event.target.value);

    // Utilisez une fonction de mappage pour obtenir l'instance de ProjectCategory
    let selectedCategory: ProjectCategory | undefined;

    switch (selectedValue) {
      case 'Technology':
        selectedCategory = ProjectCategory.Technology;
        break;
      case 'Art':
        selectedCategory = ProjectCategory.Art;
        break;
      case 'Education':
        selectedCategory = ProjectCategory.Education;
        break;
      case 'Health':
        selectedCategory = ProjectCategory.Health;
        break;
      case 'Environment':
        selectedCategory = ProjectCategory.Environment;
        break;
      case 'SocialImpact':
        selectedCategory = ProjectCategory.SocialImpact;
        break;
      case 'Entertainment':
        selectedCategory = ProjectCategory.Entertainment;
        break;
      case 'Science':
        selectedCategory = ProjectCategory.Science;
        break;
      case 'Finance':
        selectedCategory = ProjectCategory.Finance;
        break;
      case 'Sports':
        selectedCategory = ProjectCategory.Sports;
        break;
      default:
        break;
    }

    if (selectedCategory) {
      setProjectToCreate((prevProject) => ({
        ...prevProject,
        category: selectedCategory,
      }));
    }
  };

  // function to handle score score update in project to create
  const handleTrustScoreChange = (trustScore: number) => {
    setProjectToCreate((prevProject) => ({
      ...prevProject,
      trustScore: trustScore,
    }));
  };

  //* reward management
  // reward creation
  const handleAddReward = (newReward: Reward) => {
    setProjectToCreate((prevProject) => ({
      ...prevProject,
      rewards: [...prevProject.rewards, newReward], // Ajout du nouveau reward
    }));
  };

  // reward update
  const handleUpdateReward = (updatedReward: Reward) => {
    setProjectToCreate((prevProject) => ({
      ...prevProject,
      rewards: prevProject.rewards.map((reward) =>
        reward.id === updatedReward.id ? updatedReward : reward
      ),
    }));
  };

  // reward deletion
  const handleRemoveReward = (rewardId: string) => {
    setProjectToCreate((prevProject) => ({
      ...prevProject,
      rewards: prevProject.rewards.filter((reward) => reward.id !== rewardId),
    }));
  };

  //* PROJECT CREATION
  const launchProjectCreation = async () => {
    if (publicKey && userEntryAddress) {
      setIsCreationLoading(true);
      // data preparation for tx
      const projectData = await prepareDataForProjectCreation(
        projectToCreate,
        projectImageUrl,
        publicKey
      );

      // get userWallet and project ATA pubkey
      const { associatedToken: userWalletAtaPubkey } = await getATA(
        publicKey,
        connection
      );

      // creation transaction
      if (projectData)
        try {
          await createProject.mutateAsync({
            userWalletPublicKey: publicKey,
            userAccountPDA: userEntryAddress,
            project: projectData,
            userProjectCounter: userProjectCounter,
            userWalletAtaPubkey: userWalletAtaPubkey,
          });
        } catch (error) {
          console.error(error);
        }
      setIsCreationLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <h1 className="textStyle-title">
        <strong className="text-accent">Launch</strong> your project
      </h1>
      <h2 className="textStyle-headline -mt-10">
        Your about to start your founder journey ! Exiting ! <br />
        Follow the step by step process
      </h2>
      <Divider />
      {/* menu */}
      <ProjectLaunchMenu
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      {/* steps blocks */}
      {/* if no user profile, display alert */}
      {!userProfile && <ProfileCreationAlert />}
      {/* if user profile, display project creation process */}
      {userProfile && (
        <>
          <div
            className={`${selectedStep === 2 ? 'w-full' : 'w-full md:w-1/2'}`}
          >
            {' '}
            {/*to handle rewardCard display*/}
            {selectedStep === 0 && (
              <MainInfoBlock
                handleChange={handleProjectChange}
                handleCategoryChange={handleCategoryChange}
                setSelectedPic={handleProjectPicChange}
                projectToCreate={projectToCreate}
                displayedSelectedCategory={displayedSelectedCategory}
              />
            )}
            {selectedStep === 1 && (
              <FundingBlock
                handleChange={handleProjectChange}
                projectToCreate={projectToCreate}
              />
            )}
            {selectedStep === 2 && (
              <RewardsBlock
                handleAddReward={handleAddReward}
                projectToCreate={projectToCreate}
                handleRemoveReward={handleRemoveReward}
                handleUpdateReward={handleUpdateReward}
              />
            )}
            {selectedStep === 3 && (
              <DescriptionBLock
                handleChange={handleProjectChange}
                projectToCreate={projectToCreate}
              />
            )}
            {selectedStep === 4 && (
              <TrustBlock
                handleChange={handleProjectChange}
                projectToCreate={projectToCreate}
                handleTrustscoreChange={handleTrustScoreChange}
              />
            )}
            {selectedStep === 5 && <ValidationBlock />}
          </div>
          {/* continue button */}
          <div className="w-full flex justify-end">
            {selectedStep !== 5 && (
              <button onClick={() => setSelectedStep(selectedStep + 1)}>
                <MainButtonLabel label="Contrinue" />
              </button>
            )}
            {selectedStep === 5 && (
              <div className="flex flex-col items-end justify-end gap-2">
                <button
                  onClick={() => launchProjectCreation()}
                  disabled={isCreationLoading}
                >
                  <MainButtonLabelAsync
                    label="Launch your project"
                    isLoading={isCreationLoading}
                    loadingLabel={'Launching project'}
                  />
                </button>
                <p className="textStyle-body">
                  You will have to sign two transactions to launch your project
                </p>
              </div>
            )}
            {selectedStep === 5 && !publicKey && <WalletButton />}
          </div>
        </>
      )}
    </div>
  );
};

export default Launchproject;
