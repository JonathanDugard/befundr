import { categories } from '@/data/localdata';
import InputField from '../z-library/button/InputField';
import Selector from '../z-library/button/Selector';
import PicSelector from '../z-library/button/PicSelector';

type MainInfoProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setSelectedPic: (file: File | null) => void;
  projectToCreate: Project;
};

export const MainInfoBlock = (props: MainInfoProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h3 className="textStyle-headline">Step 1 : main informations</h3>
      <InputField
        label="Project name"
        placeholder="Your project name"
        type="text"
        inputName="name"
        value={props.projectToCreate.name}
        handleChange={props.handleChange}
        min={5}
        max={64}
      />
      <Selector
        label="Category"
        options={categories}
        handleChange={props.handleChange}
        inputName="category"
        value={props.projectToCreate.category}
      />
      <PicSelector
        label="Main image"
        placeholder="Select your project main image"
        setSelectedPic={props.setSelectedPic}
        maxSize={2}
        objectFit="cover"
        defaultImage={props.projectToCreate.imageUrl}
      />
    </div>
  );
};
