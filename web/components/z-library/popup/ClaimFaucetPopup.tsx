'use client';
import React, { useState } from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import { getATA } from '@/utils/functions/claimFaucet';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramGlobal } from '@/components/befundrProgram/befundr-global-access';

type Props = {
  handleClose: () => void;
};

const ClaimFaucetPopup = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useBefundrProgramGlobal();
  //* LOCAL STATE
  const [selectedAmount, setSelectedAmount] = useState<number | ''>('');

  // HANDLERS
  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSelectedAmount(!isNaN(value) ? value : '');
  };

  const amountChoices = [50, 100, 500];

  const handleClaim = async () => {
    console.log('public key :', publicKey);

    if (publicKey && selectedAmount) {
      console.log('handle claim');

      const account = await getATA(
        publicKey,
        connection,
        sendTransaction,
        selectedAmount
      );
      console.log(account);
    }
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">Claim $ faucet</p>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <p className="textStyle-body">
            Select the amount to claim or enter a custom one
          </p>
        </div>
        {/* selection amount button */}
        <div className="flex gap-4 justify-start items-center w-full">
          {amountChoices.map((amount) => (
            <button
              key={amount}
              onClick={() => handleSelectAmount(amount)}
              className={`p-4 rounded ${
                selectedAmount === amount
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {`$${amount}`}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom amount"
            value={selectedAmount === '' ? '' : selectedAmount}
            onChange={handleCustomAmountChange}
            className="p-4 border rounded w-full"
          />
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button onClick={handleClaim}>
            <MainButtonLabel label={`Claim`} />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default ClaimFaucetPopup;
