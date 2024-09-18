import { categories } from "@/data/localdata"
import Selector from "../z_library/button/Selector"
import ToggleSwitch from "../z_library/button/ToggleSwitch"
import Divider from "../z_library/display elements/Divider"
import DividerLight from "../z_library/display elements/DividerLight"
import InputField from "../z_library/display elements/InputField"
import WhiteBlock from "../z_library/display elements/WhiteBlock"
import ToggleButton from "../z_library/button/ToggleButton"
import Slider from "../z_library/button/Slider"

export const ProjectsFilters =()=>{
    return(
        <WhiteBlock>
            <div className="flex flex-col items-start justify-start gap-4 w-full ">
                <InputField placeholder="Search by project name"/>
                <DividerLight/>
                <div className="grid grid-cols-3 w-full">
                    {/* project filters */}
                    <div className="flex flex-col items-start justify-start gap-2 border-r-[1px] border-second pr-2">
                        <p className="font-light">Project status</p>
                        <div className="flex justify-center items-center gap-2">
                            <p className="textStyle-body">Funding on going</p>
                            <ToggleSwitch/>
                            <p className="textStyle-body">Realisation on going</p>
                        </div>
                        <Selector label="Category" options={categories} onChange={()=>{}}/>
                    </div>
                    {/* reward filters */}
                    <div className="flex flex-col items-start justify-start gap-2 border-r-[1px] border-second px-2">
                        <p className="font-light">Rewards</p>
                        <div className="flex justify-between items-center gap-2 w-full">
                            <p className="textStyle-body w-1/3">Max price</p>
                            <Slider max={1000} min={0} initValue={50} onChange={()=>{}} step={1}/>
                        </div>
                        <div className="flex justify-between items-end w-full flex-grow pb-2">
                            <div className="flex justify-start gap-2">
                                <p className="textStyle-body">Limited supply</p>
                                <ToggleButton/>
                            </div>
                            <div className="flex justify-end gap-2">
                                <p className="textStyle-body">Claimable rewards</p>
                                <ToggleButton/>
                            </div>
                        </div>
                    </div>
                    {/* trust filters */}
                    <div className="flex flex-col items-start justify-start gap-2 pl-2">
                        <p className="font-light">Trust</p>
                        <div className="flex justify-between items-center gap-2 w-full">
                            <p className="textStyle-body w-1/3">Trust score</p>
                            <Slider max={4} min={1} initValue={3} onChange={()=>{}} step={1}/>
                        </div>
                    </div>


                </div>
            </div>
        </WhiteBlock>
    )
}