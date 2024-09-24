import React from 'react';
import InputField from '../z-library/button/InputField';
import TextArea from '../z-library/button/TextArea';
import PicSelector from '../z-library/button/PicSelector';
import MainButtonLabel from '../z-library/button/MainButtonLabel';

type Props = {};

const MyProfile = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My public profile</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Set the public information of your profile
        </h2>
        <button>
          <MainButtonLabel label="Save change" />
        </button>
      </div>
      <div className="flex flex-col justify-start items-start gap-4">
        <PicSelector
          label="Your profile picture"
          placeholder="Select your profile picture"
          setSelectedPic={() => {}}
        />
        <InputField
          label="Your complete name"
          placeholder="Type your firstname and lastname"
          type="text"
        />
        <InputField
          label="Your pseudo"
          placeholder="Type your pseudo"
          type="text"
        />
        <InputField
          label="Your city"
          placeholder="Type your city"
          type="text"
        />
        <TextArea
          label="Quick presentation"
          placeholder="Bring as more details as possible (mainly for founder)"
          rows={5}
        />
        <InputField
          label="Your X account (optional)"
          placeholder="Type your x handle"
          type="text"
        />
        <InputField
          label="Your website (optional)"
          placeholder="Type your website address"
          type="text"
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
