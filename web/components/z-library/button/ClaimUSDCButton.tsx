'use client';
import React, { useState } from 'react';
import SecondaryButtonLabel from './SecondaryButtonLabel';
import ClaimFaucetPopup from '../popup/ClaimFaucetPopup';

type Props = {
  /*empty*/
};

const ClaimUSDCButton = (props: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div>
      <button onClick={() => setIsShowPopup(true)}>
        <SecondaryButtonLabel label="Claim faucet" />
      </button>
      {isShowPopup && (
        <ClaimFaucetPopup handleClose={() => setIsShowPopup(false)} />
      )}
    </div>
  );
};

export default ClaimUSDCButton;
