import * as React from 'react'
import { MathJax } from 'better-react-mathjax'


export const Paragraph1 = () => {

    return <div className='mt-3' style={{pageBreakBefore: 'always'}}>
        <h5 className="mt-5">Теоретическая часть</h5>

        <p>
            Пусть на количественный нормально распределённый признак 
            <MathJax inline={true}>{"\\(\\ X \\) "}</MathJax>
            воздействует фактор
            <MathJax inline={true}>{"\\(\\ F \\)"}</MathJax>,
            который имеет
            <MathJax inline={true}>{"\\(\\ p \\) "}</MathJax>
            постоянных уровней
            <MathJax inline={true}>{"\\(\\ F_1,\\ F_2,\\ ...,\\ F_p \\)"}</MathJax>.
            На каждом уровне произведено по
            <MathJax inline={true}>{"\\(\\ p \\) "}</MathJax>
            испытаний. Результаты наблюдений - числа
            (<MathJax inline={true}>{"\\(\\ x_{ij} \\) "}</MathJax>
            где
            <MathJax inline={true}>{"\\(\\ i - \\) "}</MathJax>
            номер) испытания
            (<MathJax inline={true}>{"\\(\\ i - 1,\\ 2,\\ ...,\\ q \\)"}</MathJax>),
            <MathJax inline={true}>{"\\(\\ j \\) "}</MathJax>
            - номер уровня фактора
            (<MathJax inline={true}>{"\\(\\ j - 1,\\ 2,\\ ...,\\ p \\)"}</MathJax>)
            -записывают в виде таблицы (табл. 1)
        </p>
    </div>
}