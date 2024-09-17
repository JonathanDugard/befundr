import React from 'react'

type Props = {}

const Divider = (props: Props) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex-grow  border-t border-textColor-main"></div>
        </div>
    )
}

export default Divider