import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { calculatedANOVA } from '../rv'


export const Step1 = () => {
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)

    return <div>
            <h6 className='mt-3'>Решение</h6>

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
                ${calculatedANOVASub.dataMinusAvrAndSquare[2][0]} - ${calculatedANOVASub.overallAverage} = ${calculatedANOVASub.dataMinusAvrAndSquare[2][0] - calculatedANOVASub.overallAverage} \
            \\)`}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{21} = x_{21}-${calculatedANOVASub.overallAverage} = \
                ${calculatedANOVASub.dataMinusAvrAndSquare[3][0]} - ${calculatedANOVASub.overallAverage} = ${calculatedANOVASub.dataMinusAvrAndSquare[3][0] - calculatedANOVASub.overallAverage} \
            \\)`}</MathJax>
        </p>
        <p>
            Составим расчётную таблицу (табл. 2)
        </p>
    </div>
}