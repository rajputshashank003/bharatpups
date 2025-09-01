import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = ({ color = 'white', height = 18, width = 18 }) => {
    return (
        <CircularProgress sx={{ height: `${height}px !important`, width: `${width}px !important`, backgroundcolor: 'red', color: color }} />
    )
}

export default Loader