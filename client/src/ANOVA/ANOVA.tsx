import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { DataUploader } from './practicalPart/DataUploader'
import { Description } from './practicalPart/Description'
import { Table2 } from './practicalPart/Table2'
import { Step1 } from './practicalPart/Step1'
import { Table3 } from './practicalPart/Table3'
import { calculatedANOVA, openCSV } from './rv'
import { Paragraph1 } from './teoreticalPart/Paragraph1'
import { Paragraph2 } from './teoreticalPart/Paragraph2'
import { Paragraph3 } from './teoreticalPart/Paragraph3'
import { Table1 } from './teoreticalPart/Table1'
import { Step2 } from './practicalPart/Step2'
import { global } from '../cache'

export const ANOVA = () => {
    const openCSVSub = useReactiveVar(openCSV)
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)
    const globalSub = useReactiveVar(global)
    
    return <div className='row justify-content-center'>
        <div className='col-md-6'>
            
            <h5 className='text-center mb-4'>Вычисления однофакторного дисперсионного анализа</h5>
        

            {/* -------------------------------------------teoretic-part-Start------------------------------------------ */}
            <h5 className="mt-5">Теоретическая часть</h5>
            <Paragraph1 />
            <Table1 />
            <Paragraph2 />
            <Paragraph3 />
            {/* -------------------------------------------teoretic-part-End-------------------------------------------- */}
            

            {/* -------------------------------------------practical-part-Start------------------------------------------ */}
            <h5 className="mt-5 mb-5">Практическая часть</h5>
            {!globalSub.print && <DataUploader />}
            {
                openCSVSub.data?.length > 0 && <div>
                    <Description />
                    <Table2 />
                </div>
            }
            {
                calculatedANOVASub.dataMinusAvr?.length > 0 && <div>
                    <Step1 />
                    <Table3 />
                    <Step2 />
                </div>
            }
            {/* -------------------------------------------practical-part-End-------------------------------------------- */}

        </div>
    </div>
}