import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { DataUploader } from './practicalPart/DataUploader'
import { Description } from './practicalPart/Description'
import { GeneralTable } from './practicalPart/GeneralTable'
import { data1 } from './rv'
import { Paragraph1 } from './teoreticalPart/Paragraph1'
import { Paragraph2 } from './teoreticalPart/Paragraph2'
import { Table1 } from './teoreticalPart/Table1'

export const ANOVA = () => {
    const dataSub = useReactiveVar(data1)
    
    return <div className='row justify-content-center'>
        <div className='col-md-6'>
            
            <h5 className='text-center mb-4'>Вычисления однофакторного дисперсионного анализа</h5>
        
            {/* -------------------------------------------practical-part-Start------------------------------------------ */}
            <h6>Практическая часть</h6>
            <DataUploader />
            {
                dataSub?.data.length > 0 && <div>
                    <Description />
                    <GeneralTable />
                </div>
            }
            {/* -------------------------------------------practical-part-End-------------------------------------------- */}

            {/* -------------------------------------------teoretic-part-Start------------------------------------------ */}
            <h6>Теоретическая часть</h6>
            <Paragraph1 />
            <Table1 />
            <Paragraph2 />
            {/* -------------------------------------------teoretic-part-End-------------------------------------------- */}
            

        </div>
    </div>
}