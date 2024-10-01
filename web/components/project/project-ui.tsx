import MainButtonLabel from '../z-library/button/MainButtonLabel';
import RewardCardDetailled from '../z-library/card/RewardCardDetailled';
import FeedCard from '../z-library/card/FeedCard';
import Divider from '../z-library/display elements/Divider';
import FundsRequestCard from '../z-library/card/VoteCard';
import FallbackImage from '../z-library/display elements/FallbackImage';
import { ProjectStatus } from '@/data/projectStatus';

export const AboutBlock = ({ description }: { description: string }) => {
  return <p className="textStyle-body">{description}</p>;
};

export const RewardBlock = ({
  rewards,
  projectStatus,
  projectId,
}: {
  rewards: Reward[];
  projectStatus: string;
  projectId: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full ">
      {/* donation */}
      {projectStatus === 'fundraising' && (
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-between gap-2 w-full ">
            <p className="textStyle-subheadline">Donation</p>
            <p className="textStyle-headline">Free amount</p>
            <p className="textStyle-body">No reward associated</p>
          </div>
          <button>
            <MainButtonLabel label="Contribute" />
          </button>
        </div>
      )}
      <Divider />
      {/* rewars level */}
      {rewards.map((reward: Reward, index) => (
        <div key={index} className="flex flex-col gap-6 w-full h-full">
          <RewardCardDetailled
            reward={reward}
            projectStatus={projectStatus}
            projectId={projectId}
          />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export const FounderBlock = ({
  founder,
  safetyDeposit,
}: {
  founder: User;
  safetyDeposit: number;
}) => {
  return (
    <div className="flex justify-between items-start">
      {/* founder info bock */}
      <div className="flex flex-col items-start justify-start gap-8 w-1/2">
        {/* main info */}
        <div className="flex justify-start items-start gap-4">
          <div className="bg-neutral-400 w-40 h-40 ">
            <FallbackImage
              alt="image"
              fallbackImageSrc="/images/default_project_image.jpg"
              classname=" aspect-square object-cover"
              src={founder.avatarUrl ?? ''}
              height={400}
              width={400}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <p className="textStyle-headline">{founder.name}</p>
            <p className="textStyle-subheadline">{founder.city}</p>
          </div>
        </div>
        {/* bio */}
        <p className="textStyle-body">{founder.bio}</p>
      </div>
      {/* safety deposit block */}
      <div className="flex flex-col items-end justify-start w-1/3">
        <p className="textStyle-headline">Safety deposit</p>
        <p className="textStyle-title">{safetyDeposit} $</p>
        <p className="textStyle-footnote-black text-right">
          Safety deposit are escrowed and will get back to the founder if the
          project is cancelled due to lack of initial contributions or when the
          project is successfull.
          <br />
          In case of non delivery of the rewards expected for this project,
          these funds will be used to refund contributors.
        </p>
      </div>
    </div>
  );
};

export const UpdateBlock = ({ feeds }: { feeds: Feed[] }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full ">
      {/* update list */}
      {feeds.length === 0 && (
        <p className="textStyle-body">
          There is no update for this project yet.
        </p>
      )}
      {feeds.map((feed: Feed, index) => (
        <div key={index} className="flex flex-col gap-6 w-full h-full">
          <FeedCard feed={feed} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export const FundsRequestBlock = ({
  fundsRequests,
}: {
  fundsRequests: FundsRequest[];
}) => {
  // sort votes by timestamp
  const fundsRequestsToDisplay = fundsRequests.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full ">
      {/* update list */}
      {fundsRequestsToDisplay.map((fundsRequest: FundsRequest, index) => (
        <div key={index} className="flex flex-col gap-6 w-full h-full">
          <FundsRequestCard fundsRequest={fundsRequest} />
          <Divider />
        </div>
      ))}
    </div>
  );
};
