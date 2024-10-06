import React from 'react';
import Divider from '../z-library/display_elements/Divider';

type Props = {};

const Whypage = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <h1 className="textStyle-title">Why <strong className="!text-accent">beFundr</strong>?</h1>
      
      <h2 className="textStyle-headline -mt-10">
        Depending on your role on the platform, discover how <strong className="!text-accent">beFundr</strong> makes crowdfunding better.
      </h2>
      
      <h3 className="textStyle-subtitle -mb-10">
        As a <strong className="!text-accent">Founder</strong>, earn more if you deliver.
      </h3>
      
      <p className="textStyle-body mb-2">
        At <strong className="!text-accent">beFundr</strong>, we know that your project is more than just an idea—it's a journey.
      </p>
      <p className="textStyle-body mx--2">See what beFundr brings to you:</p>
      <ul className="list-disc pl-5 mb-4">
        <li className="textStyle-body">
          <strong className="!text-accent">Drive your success:</strong> Gain access to a transparent, community-driven funding system that rewards you for delivering on your project milestones.
        </li>
        <li className="textStyle-body">
          <strong className="!text-accent">Trust at the core:</strong> Build trust through milestone-based funding, giving backers confidence and ensuring you stay focused on your goals.
        </li>
        <li className="textStyle-body">
          <strong className="!text-accent">Keep more:</strong> Lower fees compared to traditional crowdfunding means more funds go directly to your project.
        </li>
      </ul>
      
      <Divider />
      
      <h3 className="textStyle-subtitle -mb-10">
        As a <strong className="!text-accent">Contributor</strong>, invest in <strong className="!text-accent">security</strong>.
      </h3>
      
      <p className="textStyle-body mb-10">
        Supporting a project should feel as rewarding as delivering one. On <strong className="!text-accent">beFundr</strong>:
      </p>
      <ul className="list-disc pl-5 mb-10">
        <li className="textStyle-body">
          <strong className="!text-accent">Protect your contribution:</strong> With blockchain, your funds are locked and secure until the project hits key milestones.
        </li>
        <li className="textStyle-body">
          <strong className="!text-accent">Real-time transparency:</strong> Always know how your funds are being used and where the project stands.
        </li>
        <li className="textStyle-body">
          <strong className="!text-accent">Contribute with confidence:</strong> If a project fails to deliver, funds are returned, protecting your investment.
        </li>
      </ul>
      
      <Divider />
      
      <p className="textStyle-body">
        Join the future of crowdfunding. At <strong className="!text-accent">beFundr</strong>, we’re here to make crowdfunding transparent, secure, and rewarding for everyone. Start your journey with us today!
      </p>
    </div>
  );
};

export default Whypage;
