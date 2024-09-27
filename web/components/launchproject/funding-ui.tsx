import {
  convertTimestampToDateString,
  getDateFromTimestamp,
} from '@/utils/functions/utilFunctions';
import InputField from '../z-library/button/InputField';

type FundingProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  projectToCreate: Project;
};

export const FundingBlock = (props: FundingProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 2 : Funding informations</h3>
      <InputField
        label="Funding campain starting date"
        placeholder="Pick the starting date"
        type="date"
        inputName="timestamp"
        handleChange={props.handleChange}
        value={convertTimestampToDateString(props.projectToCreate.timestamp)}
      />
      <InputField
        label="Funding campain duration"
        placeholder="Select the duration (recommanded between 28 and 42 days)"
        type="number"
        handleChange={props.handleChange}
        inputName="endTime"
        value={props.projectToCreate.endTime}
      />
      <p className="textStyle-body text-right -mt-4 w-full">
        endind date :{' '}
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
