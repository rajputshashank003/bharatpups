import { motion } from 'framer-motion'
import React from 'react'

const AnimatedButton = ({children, className = ''}) => {
    
    return (
        <motion.div
            whileTap={{
                scale: 0.75
            }}
            animate={{
                scale: 1,
            }}
            transition={{
                duration: 0.2,
                ease: 'linear'
            }}
            className={className}
            >

            {children}
        </motion.div>

    )
}

export default AnimatedButton