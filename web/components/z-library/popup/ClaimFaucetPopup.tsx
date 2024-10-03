'use client';
import React, { useState } from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramGlobal } from '@/components/befundrProgram/befundr-global-access';
import MainButtonLabelAsync from '../button/MainButtonLabelAsync';
import toast from 'react-hot-toast';
import ATAbalance from '../display elements/ATAbalance';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { getATAAndMint } from '@/utils/functions/ATAAndFaucet';

type Props = {
  handleClose: () => void;
};

const ClaimFaucetPopup = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useBefundrProgramGlobal();
  const { getUserWalletATABalance } = useBefundrProgramUser();
  //* LOCAL STATE
  const [selectedAmount, setSelectedAmount] = useState<number | ''>(50);
  const [isLoading, setIsLoading] = useState(false);

  // HANDLERS
  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSelectedAmount(!isNaN(value) ? value : '');
  };

  const amountChoices = [50, 100, 500];

  const { refetch } = getUserWalletATABalance(publicKey);

  const handleClaim = async () => {
    if (!publicKey || !selectedAmount) {
      toast.error('Public key or amount missing');
      return;
    }

    try {
      setIsLoading(true);
      await getATAAndMint(
        publicKey,
        connection,
        sendTransaction,
        selectedAmount
      );
      toast.success(`Successfully claimed ${selectedAmount}$`);
      refetch();
    } catch (e) {
      toast.error('Error claiming faucet...');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full ">
        {/* title */}
        <p className="textStyle-title w-full text-center -mb-10">
          Claim $ faucet
        </p>
        <ATAbalance />
        {/* description */}
        <p className="textStyle-body">
          Select the amount to claim or enter a custom one
        </p>
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
            <SecondaryButtonLabel label="Close" />
          </button>
          <button onClick={handleClaim} disabled={isLoading}>
            <MainButtonLabelAsync
              label={`Claim`}
              isLoading={isLoading}
              loadingLabel="Claiming..."
            />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default ClaimFaucetPopup;