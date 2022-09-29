import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { data1 } from '../rv'


export const Step1 = () => {
    const dataSub = useReactiveVar(data1)

    return <div>
        <p>
            Для упрощения расчёта вычитаем из каждого наблюдаемого значения 
            <MathJax inline={true}>{"\\(\\ x_{ij} \\) "}</MathJax>
            общую средную 
            <MathJax inline={true}>{`\\(\\ \\bar{x}=${dataSub.overallAverage} \\) `}</MathJax>
            т.е. перейдём к уменьшенным величинам 
            <MathJax inline={true}>{`\\(\\ y_{ij} = x_{ij}-${dataSub.overallAverage} \\) `}</MathJax>.
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{11} = x_{11}-${dataSub.overallAverage} = \
                ${dataSub.data[2][0]} - ${dataSub.overallAverage} = ${dataSub.data[2][0] - dataSub.overallAverage} \
            \\)`}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{21} = x_{21}-${dataSub.overallAverage} = \
                ${dataSub.data[3][0]} - ${dataSub.overallAverage} = ${dataSub.data[3][0] - dataSub.overallAverage} \
            \\)`}</MathJax>
        </p>
        <p>
            Составим расчётную таблицу (табл. 2)
        </p>
    </div>
}