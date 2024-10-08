'use client';
import Image from 'next/image';
import Slider from '../z-library/button/Slider';
import TrustScore from '../z-library/display_elements/TrustScore';
import InputField from '../z-library/button/InputField';
import {
  calculateTrustScore,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import { useEffect, useMemo } from 'react';
import AtaBalance from '../z-library/display_elements/AtaBalance';
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
  const { getUserWalletAtaBalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletAtaBalance } = getUserWalletAtaBalance(publicKey);

  const ataBalance = useMemo(() => {
    if (userWalletAtaBalance) {
      return convertSplAmountToNumber(userWalletAtaBalance.amount);
    } else {
      return 0;
    }
  }, [userWalletAtaBalance]);
  // ---- get user wallet ATA balance

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 5 : Trustworthiness elements</h3>
      {/* verifeid info */}
      <p className="textStyle-subheadline !text-textColor-main">
        Your verified information
      </p>
      <p className="textStyle-subheadline">
        Befundr is based on confidence. The more information you provide, the
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
        A minimum amount of $50 is needed to start a funding campaign. These
        funds are escrowed to show your personal commitment to the project and
        to promote legitimate projects. The funds will be returned to you if the
        project is canceled due to lack of initial contributions or when the
        project is successful.
        <br />
        In case of non-delivery of the expected rewards for your project, these
        funds will be used to refund contributors.
        <br /> You can set an amount higher than $50. It will assure
        contributors of your commitment.
        <br /> A 5% ratio between your safety deposit and your fundraising goal
        will give you a 100% trust score. This trust score will evolve during
        the project based on community votes regarding your project.
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
        <p className="w-1/2">{collateralRatio.toFixed(2)}% of your fundraising target.</p>
      </div>
      <div className="flex justify-start items-center gap-2 w-full">
        <AtaBalance />
        {ataBalance < props.projectToCreate.safetyDeposit && (
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
          Aggregated trust level that will be displayed to contributors. A
          higher score is better{' '}
        </p>
      </div>
    </div>
  );
};
