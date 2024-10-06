import { categories } from '@/data/localdata';
import Selector from '../z-library/button/Selector';
import ToggleSwitch from '../z-library/button/ToggleSwitch';
import Divider from '../z-library/display_elements/Divider';
import DividerLight from '../z-library/display_elements/DividerLight';
import SearchField from '../z-library/button/SearchField';
import WhiteBlock from '../z-library/display_elements/WhiteBlock';
import ToggleButton from '../z-library/button/ToggleButton';
import Slider from '../z-library/button/Slider';
import { projectCategoryOptions } from '@/data/category';
import DisabledButtonLabel from '../z-library/button/DisabledButtonLabel';

export const ProjectsFilters = () => {
  return (
    <WhiteBlock>
      <div className="flex flex-col items-start justify-start gap-4 w-full ">
        <SearchField placeholder="Search by project name" />
        <DividerLight />
        <div className="grid grid-cols-3 w-full">
          {/* project filters */}
          <div className="flex flex-col items-start justify-start gap-2 border-r-[1px] border-second pr-2">
            <p className="textStyle-subheadline !text-textColor-main !font-normal">
              Project status
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="textStyle-body">Funding on going</p>
              <ToggleSwitch />
              <p className="textStyle-body">Realisation on going</p>
            </div>
            <Selector
              label="Category"
              options={projectCategoryOptions}
              handleChange={() => {}}
              inputName=""
              value=""
            />
          </div>
          {/* reward filters */}
          <div className="flex flex-col items-start justify-start gap-2 border-r-[1px] border-second px-2">
            <p className="textStyle-subheadline !text-textColor-main !font-normal">
              Rewards
            </p>
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="textStyle-body w-1/3">Max price</p>
              <Slider
                max={1000}
                min={0}
                initValue={50}
                handleChange={() => {}}
                step={1}
                name=""
                value={0}
              />
            </div>
            <div className="flex justify-between items-end w-full flex-grow pb-2">
              <div className="flex justify-start gap-2">
                <p className="textStyle-body">Limited supply</p>
                <ToggleButton isSelected={true} />
              </div>
              <div className="flex justify-end gap-2">
                <p className="textStyle-body">Claimable rewards</p>
                <ToggleButton isSelected={false} />
              </div>
            </div>
          </div>
          {/* trust filters */}
          <div className="flex flex-col items-start justify-start gap-2 pl-2">
            <p className="textStyle-subheadline !text-textColor-main !font-normal">
              Trust
            </p>
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="textStyle-body w-1/3">Trust score</p>
              <Slider
                max={4}
                min={1}
                initValue={3}
                handleChange={() => {}}
                step={1}
                name=""
                value={0}
              />
            </div>
          </div>
        </div>
        <DividerLight />
        <div className="inline-flex items-center w-full justify-end">
          <DisabledButtonLabel label="Apply filter" displaySoonBadge />
        </div>
      </div>
    </WhiteBlock>
  );
};
