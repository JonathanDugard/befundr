import React from 'react';

type Props = {
  label: string;
};

const AlertInfoLabel = (props: Props) => {
  return (
    <div
      className="
      bg-none rounded-md h-8 min-w-44 px-2 py-1 border border-custom-red
        textStyle-body !text-custom-red text-center
    "
    >
      {props.label}
    </div>
  );
};

export default AlertInfoLabel;
