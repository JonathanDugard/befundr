'use client';
import Image from 'next/image';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { FaRegIdCard } from 'react-icons/fa';
import Slider from '../z-library/button/Slider';
import TrustScore from '../z-library/display elements/TrustScore';
import InputField from '../z-library/button/InputField';
import {
  calculateTrustScore,
  convertAtaAmount,
} from '@/utils/functions/utilFunctions';
import { useEffect, useMemo } from 'react';
import ATAbalance from '../z-library/display elements/ATAbalance';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import ClaimUSDCButton from '../z-library/button/ClaimUSDCButton';

type TrustProps = {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  projectToCreate: Project;
  handleTrustscoreChange: (trustscore: number) => void;
};

export const TrustBlock = (props: TrustProps) => {
  const collateralRatio = useMemo(
    () =>
      (props.projectToCreate.safetyDeposit * 100) /
      props.projectToCreate.goalAmount,
    [props.projectToCreate.safetyDeposit, props.projectToCreate.goalAmount]
  );

  useEffect(() => {
    props.handleTrustscoreChange(
      calculateTrustScore(
        props.projectToCreate.safetyDeposit,
        props.projectToCreate.goalAmount
      )
    );
  }, [collateralRatio]);

  // get user wallet ATA balance ----
  const { getUserWalletATABalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletATABalance } = getUserWalletATABalance(publicKey);

  const ATABalance = useMemo(() => {
    if (userWalletATABalance) {
      return convertAtaAmount(userWalletATABalance.amount);
    } else {
      return 0;
    }
  }, [userWalletATABalance]);
  // ---- get user wallet ATA balance

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
      <div className="flex justify-start gap-2 w-full">
        <Image
          alt="x"
          src={'/x.jpg'}
          width={30}
          height={30}
          className="rounded-full object-contain"
        />
        <InputField
          handleChange={props.handleChange}
          inputName="xAccountUrl"
          label="Set the project X profile"
          placeholder="The url of the project X account"
          type="text"
          value={props.projectToCreate.xAccountUrl}
        />
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
        contributors of your engagement.
        <br /> A 5% ratio between your safety deposit and your fundraising goal
        will dive you a 100% trust score. This trust score will evolve during
        the project function of the community vote regarding your project.
      </p>
      <div className="flex justify-start items-center gap-2 w-full">
        <Slider
          initValue={50}
          max={props.projectToCreate.goalAmount * 0.05}
          min={50}
          step={10}
          handleChange={props.handleChange}
          name="safetyDeposit"
          value={props.projectToCreate.safetyDeposit}
        />
        <p className="w-1/2">{collateralRatio}% of your fundraising target.</p>
      </div>
      <div className="flex justify-start items-center gap-2 w-full">
        <ATAbalance />
        {ATABalance < props.projectToCreate.safetyDeposit && (
          <>
            <p className="textStyle-body !text-custom-red">
              you don&apos;t have enough faucet $
            </p>
            <ClaimUSDCButton />
          </>
        )}
      </div>

      {/* trust score */}
      <p className="textStyle-subheadline !text-textColor-main mt-10 mb-4">
        Final trust score{' '}
      </p>
      <div className=" flex justify-center items-center gap-4 w-full">
        <div className="h-52 aspect-square flex flex-col justify-center items-center gap-2">
          <TrustScore
            trustValue={calculateTrustScore(
              props.projectToCreate.safetyDeposit,
              props.projectToCreate.goalAmount
            )}
          />
          <p className="textStyle-headline">
            Trust score :{' '}
            {calculateTrustScore(
              props.projectToCreate.safetyDeposit,
              props.projectToCreate.goalAmount
            ).toFixed(0)}
          </p>
        </div>
        <p className="textStyle-body border border-accent rounded-md p-2">
          Aggregated trust level that will be displayed to contributors. An
          higher score is better{' '}
        </p>
      </div>
    </div>
  );
};
