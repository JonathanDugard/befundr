'use client';
import React, { useMemo, useState } from 'react';
import PopupLayout from '../z-library/popup/PopupLayout';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import toast from 'react-hot-toast';
import { useBefundrProgramSaleTransaction } from '../befundrProgram/befundr-saleTransaction-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import AtaBalance from '../z-library/display_elements/AtaBalance';
import ClaimUSDCButton from '../z-library/button/ClaimUSDCButton';
import Link from 'next/link';

type Props = {
  reward: Reward;
  saleTx: SaleTransaction;
  handleClose: () => void;
  projectId: PublicKey;
  refetchProjectSalesPda: () => void;
  refetchSalesAccount: () => void;
};

const BuyRewardPopup = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const { completeSaleTransaction } = useBefundrProgramSaleTransaction();
  const {
    getUserPdaPublicKey,
    userAccountFromAccountPublicKey,
    getUserWalletAtaBalance,
    userAccountFromWalletPublicKey,
  } = useBefundrProgramUser();

  //* LOCAL STATE
  const [isLoading, setIsLoading] = useState(false);

  const priceToDisplay = convertSplAmountToNumber(
    new BN(props.saleTx.sellingPrice)
  );

  const { data: userWalletAtaBalance, refetch } =
    getUserWalletAtaBalance(publicKey);

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromWalletPublicKey(publicKey);

  const ataBalance = useMemo(() => {
    if (userWalletAtaBalance) {
      return userWalletAtaBalance.amount;
    } else {
      return 0;
    }
  }, [userWalletAtaBalance]);

  // react query
  const { data: userPdaPublicKey } = getUserPdaPublicKey(publicKey);

  const { data: sellerAccount } = userAccountFromAccountPublicKey(
    props.saleTx.seller
  );

  const handleCompleteTransaction = async () => {
    setIsLoading(true);
    try {
      // check
      if (!publicKey) throw new Error('No wallet connected');
      if (!userPdaPublicKey) throw new Error('No user account created');
      if (!sellerAccount) throw new Error('No seller account found');
      if (userPdaPublicKey.toString() === props.saleTx.seller.toString())
        throw new Error('You cannot buy your own reward');

      // launch TX
      await completeSaleTransaction.mutateAsync({
        buyerUserPdaKey: userPdaPublicKey,
        buyerWallet: publicKey,
        contributionPdaKey: new PublicKey(props.saleTx.contribution),
        projectPdaKey: props.projectId,
        sellerPubkey: sellerAccount.owner,
        sellerUserPdaKey: new PublicKey(props.saleTx.seller),
      });
      props.refetchProjectSalesPda();
      props.refetchSalesAccount();
      props.handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Buy {props.reward.name}
        </p>
        <div className="w-full flex justify-start -mt-10">
          <AtaBalance />
        </div>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-40 h-40 bg-neutral-300"></div>
          <div className="flex flex-col items-start gap-4">
            <p className="textStyle-body">
              You are about to buy this reward for{' '}
              <strong>{priceToDisplay}$</strong>
            </p>

            {/* alert if not enough balance */}
            {ataBalance < props.saleTx.sellingPrice && (
              <>
                <p className="textStyle-body !text-custom-red">
                  you don&apos;t have enough faucet $
                </p>
                <ClaimUSDCButton />
              </>
            )}
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          {userProfile ? (
            <button
              onClick={handleCompleteTransaction}
              disabled={isLoading || ataBalance < props.saleTx.sellingPrice}
            >
              <MainButtonLabelAsync
                label={`Buy for ${priceToDisplay}$`}
                isLoading={isLoading}
                loadingLabel="Buying..."
              />
            </button>
          ) : (
            <Link href={'/profile/myprofile'}>
              <MainButtonLabel label="Create your profile" />
            </Link>
          )}
        </div>
      </div>
    </PopupLayout>
  );
};

export default BuyRewardPopup;
