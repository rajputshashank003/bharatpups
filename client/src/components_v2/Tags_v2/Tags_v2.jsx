import React from 'react'
import Chip_v2 from '../Chip/Chip_v2';

export default function Tags_v2({ tags, page_name }) {

    return (
        <div className='flex flex-row gap-4 '>
            {!page_name && <Chip_v2 tag={{ name: 'All', navigator: 'home'}} />}
            {
                tags.map((tag, ind) => {
                    if (!tag.count || tag.count == 0) {
                        return null;
                    }
                    return <Chip_v2 tag={tag} key={ind} />
                })
            } {
                tags.map((tag, ind) => {
                    if (!tag.count || tag.count == 0) {
                        return null;
                    }
                    return <Chip_v2 tag={tag} key={ind} />
                })
            }
        </div>
    )
}