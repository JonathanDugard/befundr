'use client';
import React, { useEffect, useState } from 'react';
import InputField from '../z-library/button/InputField';
import TextArea from '../z-library/button/TextArea';
import PicSelector from '../z-library/button/PicSelector';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useWallet } from '@solana/wallet-adapter-react';
import InfoLabel from '../z-library/display elements/InfoLabel';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from '@/utils/functions/firebaseFunctions';
import { useRouter } from 'next/navigation';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { concatFileName } from '@/utils/functions/utilFunctions';

const MyProfile = () => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const router = useRouter();
  const { userAccount, createUser, updateUser } = useBefundrProgramUser();

  //* LOCAL STATE
  const [isUserHasAccount, setIsUserHasAccount] = useState(false);
  const [userToDisplay, setUserToDisplay] = useState<User>({
    owner: '',
    name: '',
    avatarUrl: '',
    bio: '',
    city: '',
    createdProjectCounter: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccount(publicKey);

  // Handle profile data after fetching
  useEffect(() => {
    if (userProfile) {
      setIsUserHasAccount(true);
      setUserToDisplay(userProfile as unknown as User); // Populate form with fetched user data
    } else {
      setIsUserHasAccount(false);
    }
  }, [userProfile]);

  // handle input field modifications
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserToDisplay((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // handle profile pic modification
  const handleProfilePicChange = (file: File | null) => {
    if (file) setProfileImageFile(file);
  };

  //* PROGRAM INTERACTIONS
  const handleProfileUpdate = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    // handle profile pic upload if needed
    let avatarUrl = userToDisplay.avatarUrl;
    const oldAvatarUrl = userToDisplay.avatarUrl;

    // upload file to firestore and get the url to put in upadteUser.avatarUrl
    if (profileImageFile) {
      try {
        avatarUrl = await uploadImageToFirebase(
          `profiles/${publicKey.toString()}/${concatFileName(
            profileImageFile.name
          )}`,
          profileImageFile
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
    }

    // handle blockchain tx
    try {
      await updateUser.mutateAsync({
        signer: publicKey,
        name: userToDisplay.name,
        avatarUrl: avatarUrl,
        bio: userToDisplay.bio,
        city: userToDisplay.city || '',
      });

      // Delete old image
      if (profileImageFile && oldAvatarUrl) {
        await deleteImageFromFirebase(oldAvatarUrl);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setIsLoading(false);
  };

  const handleProfileCreation = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    // handle profile pic upload if needed
    let avatarUrl = userToDisplay.avatarUrl;

    // upload file to firestore and get the url to put in upadteUser.avatarUrl
    if (profileImageFile) {
      try {
        avatarUrl = await uploadImageToFirebase(
          `profiles/${publicKey.toString()}/${concatFileName(
            profileImageFile.name
          )}`,
          profileImageFile
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
    }

    // handle blockchain tx
    try {
      await createUser.mutateAsync({
        signer: publicKey,
        name: userToDisplay.name,
        avatarUrl: avatarUrl,
        bio: userToDisplay.bio,
        city: userToDisplay.city || '',
      });
    } catch (error) {
      console.error('Error creating profile:', error);
    }
    setIsLoading(false);
  };

  // nagiguate to homepage is user disconnected
  if (!publicKey) router.push('/');

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My public profile</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Set the public information of your profile
        </h2>
        <button
          onClick={
            isUserHasAccount ? handleProfileUpdate : handleProfileCreation
          }
          disabled={isLoading}
        >
          <MainButtonLabelAsync
            label={isUserHasAccount ? 'Update my profile' : 'Create my profile'}
            isLoading={isLoading}
            loadingLabel={
              isUserHasAccount ? 'Updating profile' : 'Creating profile'
            }
          />
        </button>
      </div>
      {!isUserHasAccount && (
        <InfoLabel label="You don't have public profile yet" />
      )}
      <div className="flex flex-col justify-start items-start gap-4">
        <PicSelector
          label="Your profile picture"
          placeholder="Select your profile picture"
          setSelectedPic={handleProfilePicChange}
          maxSize={2}
          objectFit="cover"
          defaultImage={userToDisplay.avatarUrl}
        />
        <InputField
          label="Your complete name"
          placeholder="Type your firstname and lastname"
          type="text"
          value={userToDisplay.name}
          handleChange={handleChange}
          inputName="name"
        />
        <InputField
          label="Your city"
          placeholder="Type your city"
          type="text"
          value={userToDisplay.city || ''}
          handleChange={handleChange}
          inputName="city"
        />
        <TextArea
          label="Quick presentation"
          placeholder="Bring as more details as possible (mainly for founder)"
          rows={5}
          value={userToDisplay.bio}
          handleChange={handleChange}
          inputName="bio"
        />
        <div className="flex justify-start items-center gap-2">
          <p>Your DID profile status</p>
          <button>
            <MainButtonLabel label="Sync my DID" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
