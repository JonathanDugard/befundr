import Link from 'next/link';
import React from 'react';

type Props = {
  contribution: Contribution;
};

const ContributionCard = (props: Props) => {
  return (
    <Link href={`/profile/mycontributions/${props.contribution.id}`}>
      <div className="w-60 h-80 bg-neutral-400"></div>
    </Link>
  );
};

export default ContributionCard;
