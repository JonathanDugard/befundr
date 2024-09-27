import { getDateFromTimestamp } from '@/utils/functions/utilFunctions';

export const ValidationBlock = ({
  projectToCreate,
}: {
  projectToCreate: Project;
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 6 : Project launch validation</h3>
      {/* verifeid info */}
      <p className="textStyle-subheadline !text-textColor-main">
        Check the informations you provided before launching your project
      </p>
      <p className="textStyle-subheadline">
        This is the final step and the project will be immediatly created after
        your validation. <br />
        The fundraising will start on the{' '}
        {getDateFromTimestamp(projectToCreate.timestamp, 0)}. <br />
        Please take all the time needed to review the informations provided.
      </p>
    </div>
  );
};
