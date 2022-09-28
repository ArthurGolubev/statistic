import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { data1 } from '../rv'


export const Description = () => {

    const dataSub = useReactiveVar(data1)

    return <div>
        <p>
            {dataSub.data[0][0]}
        </p>
    </div>
}