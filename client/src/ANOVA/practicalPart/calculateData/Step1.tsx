import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { useSecondStep } from './SecondStepStore'


export const Step1 = () => {
    const secondStepStore = useSecondStep()

    return <div>
        <h6 className='mt-3'>Решение</h6>
        {
            secondStepStore.to_integer && <p>
                Перейдём к целым числам 
                <MathJax inline={true}>{"\\(\\ y_{ij} = 10^k x_{ij} - C \\)"}</MathJax>
            </p>
        }
        <p>
            Для упрощения расчёта вычитаем из каждого наблюдаемого значения 
            <MathJax inline={true}>{"\\(\\ x_{ij} \\) "}</MathJax>
            общую средную 
            <MathJax inline={true}>{`\\(\\ \\bar{x}=${secondStepStore.overall_average} \\) `}</MathJax>
            т.е. перейдём к уменьшенным величинам 
            <MathJax inline={true}>{`\\(\\ y_{ij} = x_{ij}-${secondStepStore.overall_average} \\) `}</MathJax>.
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{11} = x_{11}-${secondStepStore.overall_average} = \
                ${secondStepStore.y11} - ${secondStepStore.overall_average} = \
                ${secondStepStore.data_minus_avr[0][0]} \
            \\)`}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{`\\(\\ y_{21} = x_{21}-${secondStepStore.overall_average} = \
                ${secondStepStore.y21} - ${secondStepStore.overall_average} \
                = ${secondStepStore.data_minus_avr[1][0]} \
            \\)`}</MathJax>
        </p>
        <p>
            Составим расчётную таблицу (табл. 3)
        </p>
    </div>
}