import React from 'react'
import { NormalDistribution } from './plots/NormalDistribution'
import { UniformDistribution } from './plots/UniformDistribution'

export const App = () => {

    return <div>
        <div className='row mb-5'>
            <NormalDistribution />
        </div>
        <div className='row mb-5'>
            <UniformDistribution />
        </div>
    </div>
}