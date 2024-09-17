import MainButtonLabel from "../library/button/MainButtonLabel"
import Divider from "../library/display elements/Divider"

export const KeyFigures =()=>{
    return(
        <div className="flex flex-col items-center justify-start w-full my-10">
            <div className="grid grid-cols-3 justify-items-stretch items-center w-full">
                <div className="flex items-end gap-1">
                    <p className="text-accent text-5xl font-light">20</p>
                    <p className="text-lg font-extralight text-textColor-main w-32">projects funded</p>
                </div>
                <div className="flex items-end gap-1 justify-self-center">
                    <p className="text-accent text-5xl font-light">1250</p>
                    <p className="text-lg font-extralight text-textColor-main w-32">contributors</p>
                </div>
                <div className="flex justify-end items-end gap-1">
                    <p className="text-accent text-5xl font-light">210</p>
                    <p className="text-lg font-extralight text-textColor-main text-right">rewards available</p>
                </div>
            </div>
            <Divider/>
        </div>
    )
}



export const HighlightSelection =({title}:{title:string})=>{
    return(
        <div className="flex flex-col items-start justify-start gap-6 w-full">
            <h2 className="textStyle-title2">{title}</h2>
            <div className="flex justify-between gap-4">
                <div className="w-80 h-60 bg-neutral-400"></div>
                <div className="w-80 h-60 bg-neutral-400"></div>
                <div className="w-80 h-60 bg-neutral-400"></div>
            </div>
            <div className="flex justify-end w-full mb-10">
                <button><MainButtonLabel label="See more projects"/></button>
            </div>
            <Divider/>
        </div>
    )
}