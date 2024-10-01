import InputField from '../z-library/button/InputField';
import PicSelector from '../z-library/button/PicSelector';
import { projectCategoryOptions } from '@/data/category';
import CategorySelector from '../z-library/button/CategorySelector';

type MainInfoProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedPic: (file: File | null) => void;
  projectToCreate: Project;
  displayedSelectedCategory: string;
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
      <CategorySelector
        label="Category"
        options={projectCategoryOptions}
        handleChange={props.handleCategoryChange}
        inputName="category"
        value={props.projectToCreate.category}
        displayedSelectedCategory={props.displayedSelectedCategory}
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
