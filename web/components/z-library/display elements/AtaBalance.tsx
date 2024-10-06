'use client';
import React, { useMemo } from 'react';
import InfoLabel from '../display_elements/InfoLabel';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';

type Props = {
  /*empty*/
};

const AtaBalance = (props: Props) => {
  const { getUserWalletAtaBalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletATABalance } = getUserWalletAtaBalance(publicKey);

  const ATABalance = useMemo(() => {
    if (userWalletATABalance) {
      return convertSplAmountToNumber(userWalletATABalance.amount);
    } else {
      return 0;
    }
  }, [userWalletATABalance]);

  return <InfoLabel label={`Your balance : ${ATABalance} $`} />;
};

export default AtaBalance;