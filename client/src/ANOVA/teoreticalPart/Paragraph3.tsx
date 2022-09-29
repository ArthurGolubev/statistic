import * as React from 'react'
import { MathJax } from 'better-react-mathjax'


export const Paragraph3 = () => {

    return <div className='mt-3'>
        <p>
            Если число испытаний на уровне 
            <MathJax inline={true}>{"\\(\\ F_1 \\) "}</MathJax>
            равно 
            <MathJax inline={true}>{"\\(\\ q_1 \\) "}</MathJax>
            на уровне 
            <MathJax inline={true}>{"\\(\\ F_2 \\) "}</MathJax>
            -  
            <MathJax inline={true}>{"\\(\\ q_2 \\) "}</MathJax>
            <MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax>,
            на уровне 
            <MathJax inline={true}>{"\\(\\ F_p \\) "}</MathJax>
            - 
            <MathJax inline={true}>{"\\(\\ q_p \\) "}</MathJax>,
            то общую сумму квадратов отклонений вычисляют, 
            как и в случае одинако числа испытаний на всех уровнях.
            Факторную сумму квадратов отклонений находят по формуле
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{факт}} = \
                \\frac{T^2_1}{q_1} + \
                \\frac{T^2_1}{q_1} + \
                ... + \
                \\frac{T^2_p}{q_p} - \
                \\frac{\\sum_{i = 1}^p T^2_i }{n} \
                \\) "}</MathJax>
        </p>
        <p>
            где 
            <MathJax inline={true}>{"\\(\\ n = q_1 + q_2 + ... + q_p \\) "}</MathJax>
            - общее число испытаний.
            Остальные вычисления производят, как и в случае одинакового числа испытаний:
        </p>
        <p className='text-center'>
            <MathJax inline={true}>{"\\(\\ S_{\\text{ост}} = S_{\\text{общ}} - S_{\\text{факт}} \\) "}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax inline={true}>{"\\(\\ S^2_{\\text{факт}} = \\frac{S_{\\text{факт}}}{p -1} \\) "}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax inline={true}>{"\\(\\ S^2_{\\text{ост}} = \\frac{S_{\\text{ост}}}{n - p} \\) "}</MathJax>
        </p>
    </div>
}