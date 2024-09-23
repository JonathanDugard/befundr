import React from 'react';

type Props = {
  label: string;
};

const SecondaryButtonLabelBig = (props: Props) => {
  return (
    <div className="relative bg-main hover:bg-second rounded-lg w-full h-14 px-8 py-4 group border border-textColor-second">
      <div className="absolute bg-accent h-3 w-3 rounded-full bottom-1 group-hover:-translate-y-9 right-1 transition-all    ease-in-out" />

      <div className="text-textColor-second text-center">{props.label}</div>
    </div>
  );
};

export default SecondaryButtonLabelBig;
