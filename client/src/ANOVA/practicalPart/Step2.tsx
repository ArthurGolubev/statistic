import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { calculatedANOVA, openCSV } from '../rv'


export const Step2 = () => {
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)
    const openCSVSub = useReactiveVar(openCSV)
    const alpha = (document.querySelector("#alpha") as HTMLInputElement).value ? (document.querySelector("#alpha") as HTMLInputElement).value : '0.05'

    return <div>
        {
            calculatedANOVASub.equivalenceLevelsF ? (
                <div>
                    <p>
                        Используя итоговый столбец табл. 3, найдём общую и факторную суммы квадратов отклонений,
                        учитывая, что число уровней фактора 
                        <MathJax inline={true}>{` \\( p = ${openCSVSub.data[0].length}\\)`}</MathJax>,
                        число испытаний на каждом уровне 
                        <MathJax inline={true}>{` \\( q = ${openCSVSub.data[0].length}\\) `}</MathJax>
                    </p>
                    <p className='text-center'>
                        <MathJax>{`\\(\\ S_{\\text{общ}} = \
                            \\sum_{i = 1}^p Q_j - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} = \
                            ${calculatedANOVASub.sumQj} - \\frac{${calculatedANOVASub.sumTj}^2}{${calculatedANOVASub.dataMinusAvr.length}*${calculatedANOVASub.dataMinusAvr.length}} = \
                            ${calculatedANOVASub.sTotal} \
                            \\)`}</MathJax>
                    </p>
                    <p className='text-center'>
                        <MathJax>{`\\(\\ S_{\\text{факт}} = \
                            \\frac{\\sum_{i = 1}^p T^2_j}{q} - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} = \
                            \\frac{${calculatedANOVASub.sumTj2}}{${calculatedANOVASub.dataMinusAvr.length}} - \
                            \\frac{${calculatedANOVASub.sumTj}^2}{${calculatedANOVASub.dataMinusAvr.length}*${calculatedANOVASub.dataMinusAvr.length}} = \
                            ${calculatedANOVASub.sFact} \
                            \\)`}</MathJax>
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        Если число испытаний на уровне 
                        <MathJax inline={true}>{` \\(  F_1 \\) `}</MathJax>
                        равно
                        <MathJax inline={true}>{` \\(  q_1 \\) `}</MathJax>,
                        на уровне 
                        <MathJax inline={true}>{` \\(  F_2 - q_2,\\ ...\\) `}</MathJax>, 
                        на уровне
                        <MathJax inline={true}>{` \\(  F_p - q_p\\) `}</MathJax>,
                        то общую сумму квадратов отклонений вычисляют, как и в случае одинакового числа испытаний на всех уровнях
                    </p>
                    <p className='text-center'>
                        <MathJax>
                            {`\\(\\ S_{\\text{общ}} = \
                            \\sum_{i = 1}^p Q_j - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} = \
                            ${calculatedANOVASub.sumQj} - \\frac{${calculatedANOVASub.sumTj}^2}{${calculatedANOVASub.n}} = \
                            ${calculatedANOVASub.sTotal}\
                            \\)`}
                        </MathJax>
                    </p>
                    <p>
                        Факторную сумму квадратов отклонений находят по формуле 
                    </p>
                    <p className='text-center'>
                        <MathJax>
                            {`\\(\\ S_{\\text{факт}} = \
                            \\frac{T^2_1}{q_1} + \\frac{T^2_1}{q_1} +\\ ...\\  + \\frac{T^2_p}{q_p} - \
                            \\frac{\\sum_{i = 1}^p T^2_j}{n} = \
                            ${calculatedANOVASub.sFact} \
                            \\)`}
                        </MathJax>
                    </p>
                </div>
            )
        }
        <p>
            Найдём остаточную сумму квадратов отклонений
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\( S_{\\text{ост}} = S_{\\text{общ}} - S_{\\text{факт}} = \
                ${calculatedANOVASub.sTotal} - ${calculatedANOVASub.sFact} = \
                ${calculatedANOVASub.sRemainder} \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Факторная-дисперсия-Start------------------------------------------ */}
        <p>
            Найдём факторную дисперсию; для этого разделим 
            <MathJax inline={true}>{` \\(S_{\\text{факт}}\\) `}</MathJax>
            на число степеней свободы
            <MathJax inline={true}>{` \\(p - 1 = ${openCSVSub.factors.length} - 1 = ${openCSVSub.factors.length - 1}\\) `}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ S^2_{\\text{факт}} = \
                \\frac{S_{\\text{факт}}}{p - 1} = \
                ${calculatedANOVASub.s2Fact}\
                \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Факторная-дисперсия-End-------------------------------------------- */}
        {/* -------------------------------------------Остаточная-дисперсия-Start------------------------------------------ */}
        <p>
            Найдём остаточную дисперсию; для этого разделим 
            <MathJax inline={true}>{` \\(S_{\\text{ост}}\\) `}</MathJax>
            на число степеней свободы 
            {
                calculatedANOVASub.equivalenceLevelsF ? (
                    <MathJax inline={true}>
                        {` \\( p(q - 1) = ${openCSVSub.factors.length}(${calculatedANOVASub.n} - 1)\\) `}
                    </MathJax>
                ) : (
                    <MathJax inline={true}>
                        {` \\( n - p = ${calculatedANOVASub.n}-${openCSVSub.factors.length} = \
                        ${calculatedANOVASub.n - openCSVSub.factors.length}\
                        \\) `}
                    </MathJax>
                )
            }
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ S^2_{\\text{ост}} = \
                \\frac{S_{\\text{ост}}}{n - p} = \
                ${calculatedANOVASub.s2Remainder}\
                \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Остаточная-дисперсия-End-------------------------------------------- */}
        {/* -------------------------------------------Критерием-Фишере-Снедекора-Start------------------------------------------ */}
        <p>
            Сравним факторную и остаточную дисперсию с помощью критерия Фишера-Снедекора.
            Для этого сначало найдём наблюдаемое значение критерия:
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ F_{\\text{набл}} = \
                \\frac{S^2_{\\text{факт}}}{S^2_{\\text{ост}}} = \
                ${calculatedANOVASub.fObservation}\
                \\)`}
            </MathJax>
        </p>
        <p>
            Учитывая, что число степеней свободы числителя 
            <MathJax inline={true}>{` \\(k_{1} = ${openCSVSub.factors.length - 1}\\)`}</MathJax>,
            а знаменателя 
            <MathJax inline={true}>{` \\(k_{2} = ${calculatedANOVASub.n - openCSVSub.factors.length}\\) `}</MathJax>
            и что уровень значимости 
            <MathJax inline={true}>{` \\( \\alpha = ${alpha}\\) `}</MathJax>
            находим критическую точку
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ F_{\\text{кр}}(${alpha};${openCSVSub.factors.length - 1};${calculatedANOVASub.n - openCSVSub.factors.length}) = \
                ${calculatedANOVASub.fCrit}\
                \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Критерием-Фишере-Снедекора-End-------------------------------------------- */}
        {/* -------------------------------------------Сравнение-с-критерием-Start------------------------------------------ */}
        {
            calculatedANOVASub.h0 ? (
                <p>
                    Так как 
                    <MathJax inline={true}>{` \\( F_{\\text{кр}} > F_{\\text{набл}} \\) `}</MathJax>
                    - нулевую гипотезу о равенстве групповых средних подтверждаем.
                    Другими словами, групповые средние "в целом" различаются не значимо.
                </p>
            ) : (
                <p>
                    Так как 
                    <MathJax inline={true}>{` \\( F_{\\text{набл}} > F_{\\text{кр}} \\) `}</MathJax>
                    - нулевую гипотезу о равенстве групповых средних отвергаем.
                    Другими словами, групповые средние "в целом" различаются значимо.
                </p>
            )
        }
        {/* -------------------------------------------Сравнение-с-критерием-End-------------------------------------------- */}
    </div>
}