'use client';
import React, { useMemo } from 'react';
import InfoLabel from './InfoLabel';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertATAAmount } from '@/utils/functions/utilFunctions';

type Props = {
  /*empty*/
};

const ATAbalance = (props: Props) => {
  const { getUserWalletATABalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletATABalance } = getUserWalletATABalance(publicKey);

  const ATABalance = useMemo(() => {
    if (userWalletATABalance) {
      return convertATAAmount(userWalletATABalance.amount);
    } else {
      return 0;
    }
  }, [userWalletATABalance]);

  return <InfoLabel label={`Your balance : ${ATABalance} $`} />;
};

export default ATAbalance;
