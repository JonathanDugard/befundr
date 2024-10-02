import TextArea from '../z-library/button/TextArea';

type DescriptionProps = {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  projectToCreate: Project;
};

export const DescriptionBLock = (props: DescriptionProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 4 : Detailed description</h3>
      <TextArea
        label="Detailled description of your project (10 to 500 characters)"
        placeholder="Bring as more detail as possible"
        rows={5}
        handleChange={props.handleChange}
        inputName="description"
        value={props.projectToCreate.description}
        min={10}
        max={500}
      />
    </div>
  );
};
