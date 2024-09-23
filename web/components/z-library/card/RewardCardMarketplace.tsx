import Link from 'next/link';
import React from 'react';

type Props = {
  projectId: string;
  reward: Reward;
};

const RewardCardMarketplace = (props: Props) => {
  return (
    <Link href={`/marketplace/${props.projectId}`}>
      <div className="w-60 h-80 bg-neutral-400"></div>
    </Link>
  );
};

export default RewardCardMarketplace;
