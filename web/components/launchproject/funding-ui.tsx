import { getDateFromTimestamp } from '@/utils/functions/utilFunctions';
import InputField from '../z-library/button/InputField';
import { Project } from '@/types';

type FundingProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  projectToCreate: Project;
};

export const FundingBlock = (props: FundingProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 2: Funding Information</h3>
      <InputField
        label="Funding campain duration"
        placeholder="Select the duration (between 1 to 90 days)"
        type="number"
        handleChange={props.handleChange}
        inputName="endTime"
        value={props.projectToCreate.endTime}
        min={1}
        max={90}
      />
      <p className="textStyle-body text-right -mt-4 w-full">
        ending date :{' '}
        {getDateFromTimestamp(
          props.projectToCreate.timestamp,
          props.projectToCreate.endTime
        )}
      </p>
      <InputField
        label="Funding goal in $"
        placeholder="Set the total targeted amount in $"
        type="number"
        handleChange={props.handleChange}
        inputName="goalAmount"
        value={props.projectToCreate.goalAmount}
      />
    </div>
  );
};
