import * as React from 'react'
import { TheoreticalPath } from './teoreticalPart/TheoreticalPath'
import { PracticalPart } from './practicalPart/calculateData/PracticalPart'
import { useInterface } from '../interfaceStore'
import { Interface } from './practicalPart/calculateData/Interface'

export const ANOVA = () => {
    const showTheoreticalPart = useInterface(state => state.showTheoreticalPart)
    const printView = useInterface(state => state.print.view)
    
    return <div className='row justify-content-center'>
        <div className='col-md-6'>
            
            <h5 className='mb-4 text-center'>Вычисления Однофакторного Дсперсионного Анализа</h5>

            {!printView && <Interface />}

            {/* -------------------------------------------teoretic-part-Start------------------------------------------ */}
            { showTheoreticalPart && <TheoreticalPath />}
            {/* -------------------------------------------teoretic-part-End-------------------------------------------- */}


            {/* -------------------------------------------practical-part-Start------------------------------------------ */}
            <PracticalPart />
            {/* -------------------------------------------practical-part-End-------------------------------------------- */}

        </div>
    </div>
}