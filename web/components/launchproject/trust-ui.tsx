import Image from 'next/image';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { FaRegIdCard } from 'react-icons/fa';
import Slider from '../z-library/button/Slider';
import TrustScore from '../z-library/display elements/TrustScore';

type TrustProps = {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  projectToCreate: Project;
};

export const TrustBlock = (props: TrustProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 5 : Trustworthiness elements</h3>
      {/* verifeid info */}
      <p className="textStyle-subheadline !text-textColor-main">
        Your verified informations
      </p>
      <p className="textStyle-subheadline">
        Befundr is based on confidance. The more informations you provide, the
        more contributors will trust you and your project.
      </p>
      <div className="flex justify-start gap-2">
        <Image
          alt="x"
          src={'/x.jpg'}
          width={30}
          height={30}
          className="rounded-full"
        />
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      <div className="flex justify-start gap-2">
        <FaRegIdCard size={30} className="text-textColor-main" />
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      <div className="flex justify-start items-center gap-2">
        <p className="textStyle-body !text-black">DID profile status</p>
        <button>
          <MainButtonLabel label="Verify" />
        </button>
      </div>
      {/* safety deposit */}
      <p className="textStyle-subheadline !text-textColor-main mt-10">
        Safety deposit
      </p>
      <p className="textStyle-body">
        A minimum amount of 50$ is needed to start a funding campain. These
        funds are escrowed to show your personal engagement in the project and
        to promote legitimate project. With funds will get back to you if the
        project is cancelled due to lack of initial contributions or when the
        project is successfull.
        <br />
        In case of non delivery of the rewards expected for your project, these
        funds will be used to refund contributors.
        <br /> You can set an amount superior to 50$. It will insure
        contributors of your engagement
      </p>
      <div className="flex justify-start items-center gap-2 w-full">
        <Slider
          initValue={50}
          max={props.projectToCreate.goalAmount}
          min={50}
          step={1}
          onChange={() => {}}
        />
        <p className="w-1/2">x % of your fundraising target.</p>
      </div>
      {/* trust score */}
      <p className="textStyle-subheadline !text-textColor-main mt-10 mb-4">
        Final trust score
      </p>
      <div className=" flex justify-center items-center gap-4 w-full">
        <div className="h-52 aspect-square flex flex-col justify-center items-center gap-2">
          <TrustScore trustValue={70} />
          <p className="textStyle-headline">Level X</p>
        </div>
        <p className="textStyle-body border border-accent rounded-md p-2">
          Aggregated trust level that will be displayed to contributors. An
          higher score is better{' '}
        </p>
      </div>
    </div>
  );
};
