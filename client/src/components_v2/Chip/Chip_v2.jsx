import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Chip_v2 = ({ tag }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileTap={{
                scale: 0.75
            }}
            whileHover={{
                backgroundColor : "#718096"
            }}
            transition={{
                duration: 0.2,
                ease: 'linear'
            }}
            onClick={() => navigate(tag.navigator ? '/home' : `/tag/${tag.name}`)} 
            className="min-w-[50px] flex-row gap-2 text-white cursor-pointer text-center flex whitespace-nowrap items-center justify-center h-[30px] rounded-[8px] px-2 bg-gray-400"
        >
            {
                tag.count && tag.count != 0 ?
                <span className='bg-gray-600 text-[12px] font-bold h-[20px] rounded-full w-[20px] flex justify-center items-center'>
                    { tag.count }
                </span> :
                <></>
            }
            {tag.name}
        </motion.div>
    )
}

export default Chip_v2