import MainButtonLabel from "../z_library/button/MainButtonLabel"
import RewardCard from "../z_library/card/RewardCard"
import UpdateCard from "../z_library/card/UpdateCard"
import Divider from "../z_library/display elements/Divider"

export const AboutBlock = ({description}:{description:string})=>{
    return(
        <p className="textStyle-body">{description}</p>
    )
}

export const RewardBlock =({rewards}:{rewards:Reward[]})=>{
    return(
        <div className="flex flex-col items-start justify-start gap-6 w-full ">
            {/* donation */}
            <div className="flex justify-between items-center w-full">
                <div className='flex flex-col items-start justify-between gap-2 w-full '>
                    <p className='textStyle-subheadline'>Donation</p>
                    <p className='textStyle-headline'>Free amount</p>
                    <p className="textStyle-body">No reward associated</p>
                </div>
                <button><MainButtonLabel label="Contribute"/></button>
            </div>
            <Divider/>
            {/* rewars level */}
            {rewards.map((reward:Reward,index)=>(
                <div key={index} className="flex flex-col gap-6 w-full h-full">
                    <RewardCard  reward={reward}/>
                    <Divider/>
                </div>
            ))}

        </div>
    )
}

export const FounderBlock = ({founder,safetyDeposit}:{founder:User,safetyDeposit:number})=>{
    return (
        <div className="flex justify-between items-start">
            {/* founder info bock */}
            <div className="flex flex-col items-start justify-start gap-8 w-1/2">
                {/* main info */}
                <div className="flex justify-start items-start gap-4">
                    <div className="bg-neutral-400 w-40 h-40 "></div>
                    <div className="flex flex-col items-start justify-start">
                        <p className="textStyle-headline">{founder.name}</p>
                        <p className="textStyle-subheadline">{founder.city}</p>
                    </div>
                </div>
                {/* bio */}
                <p className="textStyle-body">{founder.bio}</p>
            </div>
            {/* safety deposit block */}
            <div className="flex flex-col items-end justify-start w-1/3">
                <p className="textStyle-headline">Safety deposit</p>
                <p className="textStyle-title">{safetyDeposit} $</p>
                <p className="textStyle-footnote-black text-right">Safety deposit is escrowed until the project final delivery. It will be refund to all contributors in case of project stop.</p>
            </div>

        </div>
    )
} 

export const UpdateBlock = ({updates}:{updates:Update[]})=>{
    return(
        <div className="flex flex-col items-start justify-start gap-6 w-full ">
            {/* update list */}
            {updates.map((update:Update,index)=>(
                <div key={index} className="flex flex-col gap-6 w-full h-full">
                    <UpdateCard  update={update}/>
                    <Divider/>
                </div>
            ))}
        </div>
    )
}

export const VoteBlock = ()=>{
    return(
        <div>Vote block</div>
    )
}