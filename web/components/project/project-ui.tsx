import MainButtonLabel from '../z-library/button/MainButtonLabel';
import RewardCardDetailled from './RewardCardDetailled';
import FeedCard from '../z-library/card/FeedCard';
import Divider from '../z-library/display_elements/Divider';
import FundsRequestCard from '../z-library/card/VoteCard';
import ImageWithFallback from '../z-library/display_elements/ImageWithFallback';
import { ProjectStatus } from '@/data/projectStatus';
import Image from 'next/image';
import DonateCard from './DonateCard';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';

export const AboutBlock = ({
  description,
  xAccount,
}: {
  description: string;
  xAccount: string;
}) => {

  const xLink = "https://" + xAccount;

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <a href={xLink} className="flex gap-2" target="_blank">
        <Image
          alt="x"
          src={'/x.jpg'}
          width={30}
          height={30}
          className="rounded-full object-contain"
        />
        <p className="textStyle-subheadline underline">{xAccount}</p>
      </a>
      <p className="textStyle-body">{description}</p>
    </div>
  );
};

export const MilestonesBlock = ({
  project,
  projectId,
  refetchProject,
}: {
  project: Project;
  projectId: string;
  refetchProject: () => void;
}) => {

  // Mocked milestones data
  const mockedMilestones = [
    {
      title: "Initial Grant",
      description: "",
      dueDate: new Date('2024-03-01'),
      amountRequested: 1000000000,
      state: "Complete",
    },
    {
      title: "Prototype Development",
      description: "Create the initial prototype of the connected clothing with integrated sensors and connectivity features.",
      dueDate: new Date('2024-07-01'),
      amountRequested: 2000000000,
      state: "Approved",
    },
    {
      title: "User Testing Phase",
      description: "Conduct user testing sessions to gather feedback on the prototype's functionality and design.",
      dueDate: new Date('2024-11-15'),
      amountRequested: 1000000000,
      state: "Pending",
    },
    {
      title: "Manufacturing Setup",
      description: "Establish manufacturing processes and partnerships for large-scale production of connected clothes.",
      dueDate: new Date('2025-03-10'),
      amountRequested: 3000000000,
      state: "Upcoming",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      {mockedMilestones.map((milestone, index) => (
        <div key={index} className="flex items-center justify-between w-full p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="text-center border-secondary border-r pr-4">
              <p className="text-lg font-bold">{milestone.dueDate.getFullYear()}</p>
              <p className="text-sm">{milestone.dueDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="textStyle-headline">{milestone.title}</h3>
                <a href="#" className="textStyle-body-accent underline ml-2">Show more</a> {/* Added "show more" link */}
              </div>
              <p className="textStyle-body">
                  Requested amount: ${convertSplAmountToNumber(BigInt(milestone.amountRequested)).toLocaleString()}</p> {/* Displaying requested amount */}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className={`tag ${milestone.state.toLowerCase()}`}>
              {milestone.state}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            {milestone.state === "Pending" && (
              <button className="btn-vote">Vote</button>
            )}
            {milestone.state === "Approved" && (
              <button className="btn-claim">Withdraw</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const RewardBlock = ({
  project,
  projectId,
  refetchProject,
}: {
  project: Project;
  projectId: string;
  refetchProject: () => void;
}) => {

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full ">
      {/* donation */}
      {project.status === ProjectStatus.Fundraising.enum && (
        <div className="flex flex-col gap-6 w-full h-full">
        <DonateCard
          project={project}
          projectId={projectId}
          refetchProject={refetchProject}
        />
      </div>
      )}
      <Divider />
      {/* rewars level */}
      {project.rewards.map((reward: Reward, index) => (
        <div key={index} className="flex flex-col gap-6 w-full h-full">
          <RewardCardDetailled
            project={project}
            reward={reward}
            projectId={projectId}
            rewardId={index}
            refetchProject={refetchProject}
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
            <ImageWithFallback
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
          Safety deposits are escrowed and will be returned to the founder if the
          project is canceled due to lack of initial contributions or when the
          project is successful.
          <br />
          In case of non-delivery of the expected rewards for this project,
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
