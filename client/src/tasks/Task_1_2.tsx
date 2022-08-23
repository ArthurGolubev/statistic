import { useLazyQuery } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { GET_EXPONENTIAL_DISTRIBUTION, GET_NORMAL_DISTRIBUTION, GET_UNIFORM_DISTRIBUTION } from './query'

export const Task_1_2 = () => {

    const [uniformDistribution] = useLazyQuery(GET_UNIFORM_DISTRIBUTION)            // Равномерное
    const [normalDistribution] = useLazyQuery(GET_NORMAL_DISTRIBUTION)              // Нормальный
    const [exponentialDistribution] = useLazyQuery(GET_EXPONENTIAL_DISTRIBUTION)    // Показательное

    const [state, setState] = React.useState({
        n: {
            mean: null,
            array: [],
            variance: null,
            standardDeviation: null,
            cdf: [],
            x: [],
            title: "Равномерное распределение"
        },
        m: {
            mean: null,
            array: [],
            variance: null,
            standardDeviation: null,
            cdf: [],
            x: [],
            title: "Равномерное распределение"
        }
    })

    const calculateRvs = () => {
        let n = parseInt((document.querySelector("#n") as HTMLInputElement).value)
        let m = parseInt((document.querySelector("#m") as HTMLInputElement).value)
        let nDistribution = (document.querySelector("#n-distribution") as HTMLSelectElement).value
        let mDistribution = (document.querySelector("#m-distribution") as HTMLSelectElement).value
        let a = parseInt((document.querySelector("#a") as HTMLInputElement).value)

        const getSample = (type: string, sample: string, sampleSize: number) => {
            console.log(sample)
            switch(type){
                case "1":
                    uniformDistribution({
                        variables: {sampleSize},
                        fetchPolicy: "network-only",
                        onCompleted: data => setState({
                            ...state,
                            [sample]: {
                                ...data.uniformDistributionStatistic,
                                title: "Равномерное распределение"
                            }
                            
                        })
                    })
                    break;
                case "2":
                    normalDistribution({
                        variables: {sampleSize},
                        fetchPolicy: "network-only",
                        onCompleted: data => setState({
                            ...state,
                            [sample]: {
                                ...data.normalDistributionStatistic,
                                title: "Нормальное распределение"
                            }
                        })
                    })
                    break;
                case "3":
                    exponentialDistribution({
                        variables: {sampleSize},
                        fetchPolicy: "network-only",
                        onCompleted: data => setState({
                            ...state,
                            [sample]: {
                                ...data.exponentialDistributionStatistic,
                                title: "Показательно распределение"
                            }
                        })
                    })
                    break;
            }
        }

        getSample(nDistribution, 'n', n)
        getSample(mDistribution, 'm', m)


    }



    return <div>
        <h5 className='text-center mb-4'>
            Разработать программное обеспечение, реализующее проверку статистических гипотиз о тождественности
            законов распределения случайных величин на основе критерия Смирнова-Колмагорова
        </h5>
        <div className='row mt-5'>
            {/* Описание задания */}
            <h6 className=''>Задание 1.2</h6>
            <div className='col-10'>
                <ol>
                    <li>
                        <p>
                            Разработать датчик случайных величин с заданным законом распределения 
                            <MathJax inline={true}>{"\\(\\ p(x) \\)"}</MathJax>.
                            Сформировать статистические выборки 
                            <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax> и 
                            <MathJax inline={true}>{"\\(\\ (y^i, i=\\overline{1,m}) \\)"}</MathJax>.
                            Задать объём выборок 
                            <MathJax inline={true}>{"\\(\\ n \\)"}</MathJax> и
                            <MathJax inline={true}>{"\\(\\ m \\)"}</MathJax>.
                            Выбрать законы распределения случайных величин
                            <MathJax inline={true}>{"\\(\\ x \\)"}</MathJax> и
                            <MathJax inline={true}>{"\\(\\ y \\)"}</MathJax>.
                        </p>
                        
                    </li>
                    <li>
                        <p>
                            При заданных значениях риска 
                            <MathJax inline={true}>{"\\(\\ a = 0.05; 0.1; 0.15; 0.2; \\) "}</MathJax>
                            проверить гипотизу о тождественности законов распределения, представленных выборками 
                            <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax>, 
                            <MathJax inline={true}>{"\\(\\ (y^i, i=\\overline{1,m}) \\)"}</MathJax>.
                            Принять значение
                            <MathJax inline={true}>{"\\(\\ n = 50; 100; 200; 300; 400; 500 \\)"}</MathJax>.
                            Значение 
                            <MathJax inline={true}>{"\\(\\ m = 2*n \\)"}</MathJax>.
                        </p>
                    </li>
                    <li>
                        <p>
                            При заданных значениях риска
                            <MathJax inline={true}>{"\\(\\ a \\)"}</MathJax> 
                            проверить гипотезу о тождественности теоретического и эмпирического законов распределения. 
                            Эмпирический закон распределения восстанавливается по выборке 
                            <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax>, 
                            <MathJax inline={true}>{"\\(\\ n = 50; 100; 200; 300; 400; 500 \\)"}</MathJax>.
                            Значения 
                            <MathJax inline={true}>{"\\(\\ a = 0.05; 0.1; 0.15; 0.2; \\) "}</MathJax> 
                        </p>
                    </li>
                </ol>
            </div>
        </div>
        {/* Ввод значений */}
        <div className='row mb-2 mt-3'>
            <h6>Ввод значений выборок
                <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax> и 
                <MathJax inline={true}>{"\\(\\ (y^i, i=\\overline{1,m}) \\)"}</MathJax>
            </h6>
            <div className='col-6'>
                <ol className='d-grid gap-3'>
                    <li>
                        <div className="input-group input-group-sm">
                            <span className='input-group-text'><MathJax inline={true}>{"\\(\\ n \\)"}</MathJax></span>
                            <input id="n" className='form-control' type='number' placeholder='Количество наблюдений...' />
                            <span className='input-group-text'><MathJax inline={true}>{"\\(\\ p(x) \\)"}</MathJax></span>
                            <select id='n-distribution' className='form-select'>
                                <option value="1">Равномерный</option>
                                <option value="2">Нормальный</option>
                                <option value="3">Показательный</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="input-group input-group-sm">
                            <span className='input-group-text'><MathJax inline={true}>{"\\(\\ m \\)"}</MathJax></span>
                            <input id="m" className='form-control' type='number' placeholder='Количество наблюдений...' />
                            <span className='input-group-text'><MathJax inline={true}>{"\\(\\ p(x) \\)"}</MathJax></span>
                            <select id='m-distribution' className='form-select'>
                                <option value="1">Равномерный</option>
                                <option value="2">Нормальный</option>
                                <option value="3">Показательный</option>
                            </select>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        {/* Ввод значения риска отвергнуть теорию (альфа) */}
        <div className='row mb-5'>
            <h6>
                Ввод значения риска отвергнуть теорию
                <MathJax inline={true}>{"\\(\\ a \\)"}</MathJax> 
            </h6>
            <div className='col-6'>
                <div className="input-group input-group-sm ps-4">
                    <span className='input-group-text'><MathJax inline={true}>{"\\(\\ a \\)"}</MathJax></span>
                    <input id="a" className='form-control' type='number' placeholder='Значение а...' step="0.1"/>
                    <button onClick={()=>calculateRvs()}
                    className='btn btn-sm btn-success' type='button'>Расчитать</button>
                </div>
            </div>
        </div>
        <button onClick={()=>console.log(state)} className='btn btn-sm btn-success' type='button'>state</button>
    </div>
}