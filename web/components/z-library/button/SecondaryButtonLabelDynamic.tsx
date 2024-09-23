import React from 'react';

type Props = {
  label: string;
};

const SecondaryButtonLabelDynamic = (props: Props) => {
  return (
    <div className="relative bg-main hover:bg-second rounded-md h-8 py-1 group border border-textColor-second">
      <div className="absolute bg-accent h-2 w-2 rounded-full bottom-1 group-hover:-translate-y-4 right-1 transition-all    ease-in-out" />

      <div className="text-textColor-second">{props.label}</div>
    </div>
  );
};

export default SecondaryButtonLabelDynamic;
