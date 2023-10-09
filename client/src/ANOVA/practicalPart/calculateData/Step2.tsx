import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { useSecondStep } from './SecondStepStore'
import { useDataDescription } from '../stepOne/dataDescriptionStore'


export const Step2 = () => {
    const secondStepStore = useSecondStep()
    const factors = Object.values(useDataDescription().factors)
    const alpha = (document.querySelector("#alpha") as HTMLInputElement).value ? (document.querySelector("#alpha") as HTMLInputElement).value : '0.05'
    const data = Object.values(useDataDescription().data).map(e => Object.values(e))

    return <div>
        {
            secondStepStore.equivalence_levels_F ? (
                <div>
                    <p>
                        Используя итоговый столбец табл. 3, найдём общую и факторную суммы квадратов отклонений,
                        учитывая, что число уровней фактора 
                        <MathJax inline={true}>{` \\( p = ${data[0].length}\\)`}</MathJax>,
                        число испытаний на каждом уровне 
                        {/* TODO Чекнуть вложенность */}
                        {/* <MathJax inline={true}>{` \\( q = ${openCSVSub.data[0].length}\\) `}</MathJax> */}
                        <MathJax inline={true}>{` \\( q = ${data[0][0].length}\\) `}</MathJax>
                    </p>
                    <p className='text-center'>
                        <MathJax>{`\\(\\ S_{\\text{общ}} = \
                            \\sum_{i = 1}^p Q_j - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} = \
                            ${secondStepStore.sum_Qj} - \\frac{${secondStepStore.sum_Tj}^2}{${secondStepStore.data_minus_avr.length}*${secondStepStore.data_minus_avr.length}} = \
                            ${secondStepStore.s_total} \
                            \\)`}</MathJax>
                    </p>
                    <p className='text-center'>
                        <MathJax>{`\\(\\ S_{\\text{факт}} = \
                            \\frac{\\sum_{i = 1}^p T^2_j}{q} - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} = \
                            \\frac{${secondStepStore.sum_Tj2}}{${secondStepStore.data_minus_avr.length}} - \
                            \\frac{${secondStepStore.sum_Tj}^2}{${secondStepStore.data_minus_avr.length}*${secondStepStore.data_minus_avr.length}} = \
                            ${secondStepStore.s_fact} \
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
                            ${secondStepStore.sum_Qj} - \\frac{${secondStepStore.sum_Tj}^2}{${secondStepStore.n}} = \
                            ${secondStepStore.s_total}\
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
                            ${secondStepStore.s_fact} \
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
                ${secondStepStore.s_total} - ${secondStepStore.s_fact} = \
                ${secondStepStore.s_remainder} \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Факторная-дисперсия-Start------------------------------------------ */}
        <p>
            Найдём факторную дисперсию; для этого разделим 
            <MathJax inline={true}>{` \\(S_{\\text{факт}}\\) `}</MathJax>
            на число степеней свободы
            <MathJax inline={true}>{` \\(p - 1 = ${factors.length} - 1 = ${factors.length - 1}\\) `}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ S^2_{\\text{факт}} = \
                \\frac{S_{\\text{факт}}}{p - 1} = \
                ${secondStepStore.s2_fact}\
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
                secondStepStore.equivalence_levels_F ? (
                    <MathJax inline={true}>
                        {` \\( p(q - 1) = ${factors.length}(${secondStepStore.n} - 1)\\) `}
                    </MathJax>
                ) : (
                    <MathJax inline={true}>
                        {` \\( n - p = ${secondStepStore.n}-${factors.length} = \
                        ${secondStepStore.n - factors.length}\
                        \\) `}
                    </MathJax>
                )
            }
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ S^2_{\\text{ост}} = \
                \\frac{S_{\\text{ост}}}{n - p} = \
                ${secondStepStore.s2_remainder}\
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
                ${secondStepStore.f_observation}\
                \\)`}
            </MathJax>
        </p>
        <p>
            Учитывая, что число степеней свободы числителя 
            <MathJax inline={true}>{` \\(k_{1} = ${factors.length - 1}\\)`}</MathJax>,
            а знаменателя 
            <MathJax inline={true}>{` \\(k_{2} = ${secondStepStore.n - factors.length}\\) `}</MathJax>
            и что уровень значимости 
            <MathJax inline={true}>{` \\( \\alpha = ${alpha}\\) `}</MathJax>
            находим критическую точку
        </p>
        <p className='text-center'>
            <MathJax>
                {`\\(\\ F_{\\text{кр}}(${alpha};${factors.length - 1};${secondStepStore.n - factors.length}) = \
                ${secondStepStore.f_crit}\
                \\)`}
            </MathJax>
        </p>
        {/* -------------------------------------------Критерием-Фишере-Снедекора-End-------------------------------------------- */}
        {/* -------------------------------------------Сравнение-с-критерием-Start------------------------------------------ */}
        {
            secondStepStore.h0 ? (
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