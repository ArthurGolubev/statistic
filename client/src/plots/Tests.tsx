import * as React from "react"
import { NormalDistribution } from "./NormalDistribution"
import { UniformDistribution } from "./UniformDistribution"

export const Tests = () => {
    return <div>
        <div className='row mb-5'>
            <NormalDistribution />
        </div>
        <div className='row mb-5'>
            <UniformDistribution />
        </div>
    </div>

}