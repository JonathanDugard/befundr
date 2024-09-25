import React from 'react';

type Props = {};

const Help = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <h1 className="textStyle-title">Help center</h1>
      <h2 className="textStyle-headline -mt-10">
        You will find below the frequently asked questions about beFundr.
      </h2>
    </div>
  );
};

export default Help;
