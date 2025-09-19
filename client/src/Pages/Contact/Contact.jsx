import React from 'react'
import { copy_phone } from '../../helpers/utils'

const Contact = () => {
    return (
        <div className='p-4 '>
            <span className='text-white text-[34px] '>
                Contact Us
            </span>
            <div onClick={() => copy_phone()} className='flex max-mids:text-[24px] text-white gap-[12px] text-[34px] justify-center items-center cursor-pointer bg-neutral-800 p-4 rounded-[12px] w-fit '>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                <span>+91 8989786867</span>
            </div>
        </div>
    )
}

export default Contact