import ContributionDetail from '@/components/mycontributions/contributionDetail';
import React from 'react';

type Props = {
  params: {
    contributionId: string;
  };
};

const page = (props: Props) => {
  return <ContributionDetail contributionId={props.params.contributionId} />;
};

export default page;
