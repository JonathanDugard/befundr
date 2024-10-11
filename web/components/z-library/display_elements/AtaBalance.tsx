'use client';
import React, { useEffect, useMemo, useState } from 'react';
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

  const ataBalance = useMemo(() => {
    if (userWalletAtaBalance) {
      return convertSplAmountToNumber(userWalletAtaBalance.amount);
    } else {
      return 0;
    }
  }, [userWalletAtaBalance]);

  const [formattedBalance, setFormattedBalance] = useState<string>('');

  useEffect(() => {
    const formatAmount = () => {
      const formattedAmount = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: 'USD', // Change this to the desired currency
      }).format(ataBalance);
      setFormattedBalance(formattedAmount);
    };
    formatAmount();
  }, [ataBalance]);

  const [showBalance, setShowBalance] = useState(false); // State to toggle balance visibility

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    publicKey && (
      <div onClick={toggleBalanceVisibility}>
        {!showBalance && (
          <InfoLabel label={`Show your balance`} faeyeicon={true} />
        )}
        {showBalance && (
          <InfoLabel label={`${formattedBalance}`} faeyeslashicon={true} />
        )}
      </div>
    )
  );
};

export default AtaBalance;
