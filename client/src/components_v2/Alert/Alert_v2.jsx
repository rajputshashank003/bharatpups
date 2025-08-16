import React from 'react'
import { theme_color } from '../../constants/constants'

const Alert_v2 = (props) => {
    return (
        <div onClick={props.onClick} className={`rounded-[8px] border text-[${theme_color}] mt-4 px-2 h-[45px] flex justify-start cursor-pointer bg-red-100/60 items-center border-[${theme_color}] text-[20px]`}>
            {props.alert}
        </div>
    )
}

export default Alert_v2