import * as React from 'react'
import { MathJax } from 'better-react-mathjax'


export const Paragraph2 = () => {

    return <div className='mt-3'>
        <p>
            Ставиться задача: на уровне значимости
            <MathJax inline={true}>{"\\(\\ \\alpha \\) "}</MathJax>
            проверить нулевую гипотезу о равенстве групповых средних при допущении,
            что групповые генеральные дисперсии хотя и не известны, но одинаковы.
            Для решения этой задачи вводится: <i>общая сумма</i> квадратов отклонений
            наблюдаемых значений признака от общей средней
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{общ}} = \\sum_{i = 1}^p \\sum_{j = 1}^q (x_{ij} - \\bar{x})^2 \\) "}</MathJax>
        </p>
        <p>
            <i>факторная сумма</i> квадратов отклонений наблюдаемых значений группы от своей
            групповой средней (характеризует рассеяние "внутри группы")
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ \
            S_{\\text{ост}} = \
            \\sum_{i = 1}^q (x_{i1} - \\bar{x}_{\\text{гр}1})^2 + \
            \\sum_{i = 1}^q (x_{i2} - \\bar{x}_{\\text{гр}2})^2 + \
            ... + \
            \\sum_{i = 1}^q (x_{ip} - \\bar{x}_{\\text{гр}p})^2 + \
            \\) "}</MathJax>
        </p>
        <p>
            Практически остаточную сумму находят по формуле
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{ост}} = S_{\\text{общ}} - S_{\\text{факт}} \\)"}</MathJax>
        </p>
        <p>
            Для вычисления общей и факторной сумм более удобны следующие формулы:
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{общ}} = \\sum_{i = 1}^p P_j - \\frac{[\\sum_{i = 1}^p R_j]^2}{pq} \\)"}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{факт}} = \\sum_{i = 1}^p \\frac{R^2_j}{q} - \\frac{[\\sum_{i = 1}^p R_j]^2}{pq} \\)"}</MathJax>
        </p>
        <p>
            где
            <MathJax inline={true}>{"\\(\\ P_j = \\sum_{i = 1}^q x^2_{ij} \\) "}</MathJax>
            - сумма квадратов наблюдаемых значений признака на уровне
            <MathJax inline={true}>{"\\(\\ F_j \\) "}</MathJax>;
            <MathJax inline={true}>{"\\(\\ R_j = \\sum_{i = 1}^q x_{ij} \\) "}</MathJax>
            - сумма наблюдаемых значений признака на уровне 
            <MathJax inline={true}>{"\\(\\ F_j \\) "}</MathJax>.
        </p>
        <p>
            Если наблюдаемые значения признака - сравнительно большие числа,
            то для упрощения вычислений вычитают из каждого наблюдаемого значения
            одно и то же число
            <MathJax inline={true}>{"\\(\\ С \\)"}</MathJax>, 
            примерно равное общей средней. Если уменшенные значения
            <MathJax inline={true}>{"\\(\\ y_{ij} = x_{ij} - C \\)"}</MathJax>, 
            то
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{общ}} = \\sum_{i = 1}^p Q_j  - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} \\)"}</MathJax>
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ S_{\\text{факт}} = \\frac{\\sum_{i = 1}^p T^2_j}{q} - \\frac{[\\sum_{i = 1}^p T_j]^2}{pq} \\)"}</MathJax>
        </p>
        <p>
            где
            <MathJax inline={true}>{"\\(\\ Q_j = \\sum_{i = 1}^q y^2_{ij} \\) "}</MathJax>
            - сумма квадратов уменьшенных значений признака на уровне
            <MathJax inline={true}>{"\\(\\ F_j \\) "}</MathJax>;
            <MathJax inline={true}>{"\\(\\ T_j = \\sum_{i = 1}^q y_{ij} \\) "}</MathJax>
            - сумма уменьшенных значений признака на уровне
            <MathJax inline={true}>{"\\(\\ F_j \\) "}</MathJax>.
        </p>
        <p>
            Разделив уже вычисленные факторную и остаточную суммы на соответствующее число степеней свободы,
            находят факторную и остаточную дисперсии:
        </p>
        <p className='text-center'>
            <MathJax inline={true}>{"\\(\\ S^2_{\\text{факт}} = \\frac{S^2_{\\text{факт}}}{p - 1} \\)"}</MathJax>,
            <MathJax inline={true}>{" \\(\\ S^2_{\\text{ост}} = \\frac{S^2_{\\text{ост}}}{p(q - 1)} \\)"}</MathJax>
        </p>
        <p>
            Наконец, сравнивают факторную и остаточную дисперсии по критерию Фишера-Снедекора.
        </p>
        <p>
            Если
            <MathJax inline={true}>{"\\(\\ F_{\\text{набл}} < F_{\\text{кр}} \\) "}</MathJax>
            - различие групповых средних незначимое.
        </p>
        <p>
            Если
            <MathJax inline={true}>{"\\(\\ F_{\\text{набл}} > F_{\\text{кр}} \\) "}</MathJax>
            - различие групповых средних значимое.
        </p>
        <p>
            <i>Замечание 1.</i>
            <br/>
            Если факторная дисперсия окажется дисперсия окажется меньше остаточной, 
            то уже от сюда непосредственно следует спреведливость нулевой гипотезы о равенстве групповых средних, 
            поэтому дальнейшие вычисления (сравнение дисперсий с помощью критерия 
            <MathJax inline={true}>{"\\(\\ F \\) "}</MathJax>)
            излишни.
        </p>
        <p>
            <i>Замечание 2.</i> 
            <br/>
            Если наблюдаемые значения 
            <MathJax inline={true}>{"\\(\\ x_{ij} \\) "}</MathJax>
            - десятичные дроби с 
            <MathJax inline={true}>{"\\(\\ k \\) "}</MathJax>
            знаками после запятой, то целесообразной перейти к целым числам
        </p>
        <p className='text-center'>
            <MathJax>{"\\(\\ y_{ij} = 10^k x_{ij} - C \\)"}</MathJax>
        </p>
        <p>
            где 
            <MathJax inline={true}>{"\\(\\ С \\) "}</MathJax>
            - примерно среднее значение чисел 
            <MathJax inline={true}>{"\\(\\ 10^k x_{ij} \\)"}</MathJax>. 
            При этом факторная и остаточная дисперсия увеличатся в
            <MathJax inline={true}>{"\\(\\ 10^{2k} \\) "}</MathJax>
            раз, однако их отношение не измениться
        </p>
    </div>
}