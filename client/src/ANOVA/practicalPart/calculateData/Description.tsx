import * as React from 'react'
import { useDataDescription } from '../stepOne/dataDescriptionStore'


export const Description = () => {
    const description = useDataDescription().description 

    return <div className='mt-4'>
        <p>
            {description} (табл. 2)
        </p>
    </div>
}