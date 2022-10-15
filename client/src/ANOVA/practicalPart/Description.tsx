import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { openCSV } from '../rv'


export const Description = () => {

    const openCSVSub = useReactiveVar(openCSV)

    return <div className='mt-4'>
        <p>
            {openCSVSub.description} (табл. 2)
        </p>
    </div>
}