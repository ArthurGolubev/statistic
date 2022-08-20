// TODO 1. Сгенерировать выборку
// TODO 2. Расчитать оценки МО, Д, СР.откл
// TODO 3. Построить оценку ФРВ

import { MathJax } from 'better-react-mathjax'
import * as React from 'react'

export const Task_1_1 = () => {
    return <div>
        <h5 className='text-center mb-4'>Разработать програмное обеспечение реализующее расчёт основных характеристик распределения случайных велечин</h5>
        <div className='row mt-5'>
            {/* Описание задания */}
            <h6 className=''>Задание 1.2</h6>
            <div className='col-10'>
                <ol>
                    <li>
                        <p>
                            Сгенерировать выборку <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax>,
                            используя датчики случайных велечин с <b>равномерным</b>, <b>нормальным</b> и <b>показательным</b> законами распределения
                            на интервале [0;1]. Задать обём выборки <MathJax inline={true}>{"\\(\\ n \\)"}</MathJax>
                        </p>
                    </li>
                    <li>
                        <p>
                            Расчитать оценки <b>математического ожидания</b>, <b>дисперсии</b> и <b>среднеквадратического отклонения</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            Построить оценку функции распределения случайной велечины <MathJax inline={true}>{"\\(\\ x \\)"}</MathJax>
                        </p>
                    </li>
                </ol>
            </div>
        </div>
        {/* Ввод значений */}
        <div className='row mt-5'>
            <h6>Ввод значений</h6>
            <div className='col-6'>
                <div className="input-group input-group-sm">
                    <span className='input-group-text'></span>
                </div>
            </div>
        </div>
    </div>
}