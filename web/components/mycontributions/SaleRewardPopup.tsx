'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PopupLayout from '../z-library/popup/PopupLayout';
import InputField from '../z-library/button/InputField';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramSaleTransaction } from '../befundrProgram/befundr-saleTransaction-access';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import toast from 'react-hot-toast';
import { convertNumberToSplAmount } from '@/utils/functions/utilFunctions';

type Props = {
  reward: Reward;
  floorPrice?: number | undefined | null;
  handleClose: () => void;
  contributionPdaPublicKey: string;
  refetchSaleTransaction: () => void;
  projectPdaKey: PublicKey;
};

const SaleRewardPopup = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const { createSaleTransaction } = useBefundrProgramSaleTransaction();
  const { getUserPdaPublicKey } = useBefundrProgramUser();

  //* LOCAL STATE
  const [sellingPrice, setSellingPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userPdaPublicKey } = getUserPdaPublicKey(publicKey);

  const handleCreateSellTransaction = async () => {
    setIsLoading(true);
    try {
      if (!userPdaPublicKey) {
        throw new Error('missing user Pda publicKey');
      }
      if (!publicKey) {
        throw new Error('missing user wallet');
      }
      await createSaleTransaction.mutateAsync({
        projectPdaPublicKey: props.projectPdaKey,
        contributionPdaPublicKey: new PublicKey(props.contributionPdaPublicKey),
        userPdaPublicKey,
        userWallet: publicKey,
        sellingPrice,
      });
      toast.success('Contribution on sale !');
      props.refetchSaleTransaction();
      props.handleClose();
    } catch (error) {
      console.error('error creating sale :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Sell {props.reward.name}
        </p>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="relative w-40 h-40">
            <Image
              alt="reward pic"
              src={props.reward.imageUrl}
              fill
              className="object-contain"
            />
          </div>
          <div className="w-full">
            <InputField
              label={`Selling price`}
              placeholder="Set the selling price in $ for your reward"
              type="number"
              handleChange={(e) => setSellingPrice(Number(e.target.value))}
              inputName="price"
              value={sellingPrice}
            />
            {/* {props.floorPrice && (
              <p className="textStyle-body">
                Current floor price : {props.floorPrice}$
              </p>
            )} */}
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button onClick={handleCreateSellTransaction}>
            <MainButtonLabel label="Sell" />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default SaleRewardPopup;
