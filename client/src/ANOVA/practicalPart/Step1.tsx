import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { calculatedANOVA, openCSV } from '../rv'


export const Step1 = () => {
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)
    const openCSVSub = useReactiveVar(openCSV)

    return <div>
        <h6 className='mt-3'>Решение</h6>
        {
            calculatedANOVASub.toInteger && <p>
                Перейдём к целым числам 
                <MathJax inline={true}>{"\\(\\ y_{ij} = 10^k x_{ij} - C \\)"}</MathJax>
            </p>
        }
        <p>
            Для упрощения расчёта вычитаем из каждого наблюдаемого значения 
            <MathJax inline={true}>{"\\(\\ x_{ij} \\) "}</MathJax>
            общую средную 
            <MathJax inline={true}>{`\\(\\ \\bar{x}=${calculatedANOVASub.overallAverage} \\) `}</MathJax>
            т.е. перейдём к уменьшенным величинам 
            <MathJax inline={true}>{`\\(\\ y_{ij} = x_{ij}-${calculatedANOVASub.overallAverage} \\) `}</MathJax>.
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{11} = x_{11}-${calculatedANOVASub.overallAverage} = \
                ${calculatedANOVASub.y11} - ${calculatedANOVASub.overallAverage} = \
                ${calculatedANOVASub.dataMinusAvr[0][0]} \
            \\)`}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{21} = x_{21}-${calculatedANOVASub.overallAverage} = \
                ${calculatedANOVASub.y21} - ${calculatedANOVASub.overallAverage} \
                = ${calculatedANOVASub.dataMinusAvr[1][0]} \
            \\)`}</MathJax>
        </p>
        <p>
            Составим расчётную таблицу (табл. 3)
        </p>
    </div>
}