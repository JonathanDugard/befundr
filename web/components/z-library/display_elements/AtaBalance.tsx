'use client';
import React, { useMemo } from 'react';
import InfoLabel from './InfoLabel';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';

type Props = {
  /*empty*/
};

const AtaBalance = (props: Props) => {
  const { getUserWalletAtaBalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletAtaBalance } = getUserWalletAtaBalance(publicKey);

  const AtaBalance = useMemo(() => {
    if (userWalletAtaBalance) {
      return convertSplAmountToNumber(userWalletAtaBalance.amount);
    } else {
      return 0;
    }
  }, [userWalletAtaBalance]);

  return <InfoLabel label={`Your balance : ${AtaBalance} $`} />;
};

export default AtaBalance;
