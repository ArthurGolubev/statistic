import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import Plot from 'react-plotly.js'
import { ax } from '../ANOVA/axiosInstance'

export const Task_1_1 = () => {
    
    const [state, setState] = React.useState({
        mean: null,
        array: [],
        variance: null,
        standardDeviation: null,
        cdf: [],
        x: [],
        title: "Равномерное распределение"
    })

    
    const calculateRvs = (n: HTMLInputElement, distributionType: HTMLSelectElement) => {
        ax.post('/destribution/calculate', {sample_size: parseInt(n.value), distribution_type: distributionType.value}).then(data => setState({...data.data}))
    }

    
    return <div>
        <h5 className='text-center mb-4'>Разработать програмное обеспечение реализующее расчёт основных характеристик распределения случайных велечин</h5>
        <div className='row mt-5'>
            {/* Описание задания */}
            <h6 className=''>Задание 1.1</h6>
            <div className='col-10'>
                <ol>
                    <li>
                        <p>
                            Сгенерировать выборку <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax>,
                            используя датчики случайных величин с <b>равномерным</b>, <b>нормальным</b> и <b>показательным</b> законами распределения
                            на интервале <b>[0;1]</b>. Задать обём выборки <MathJax inline={true}>{"\\(\\ n \\)"}</MathJax>
                        </p>
                    </li>
                    <li>
                        <p>
                            Расчитать оценки <b>математического ожидания</b>, <b>дисперсии</b> и <b>среднеквадратического отклонения</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            Построить оценку функции распределения случайной величины <MathJax inline={true}>{"\\(\\ x \\)"}</MathJax>
                        </p>
                    </li>
                </ol>
            </div>
        </div>
        {/* Ввод значений */}
        <div className='row mb-5'>
            <h6>Ввод значений</h6>
            <div className='col-6'>
                <div className="input-group input-group-sm">
                    <span className='input-group-text'><MathJax inline={true}>{"\\(\\ n \\)"}</MathJax></span>
                    <input id="n" className='form-control' type='number' placeholder='Количество наблюдений...' />
                    <span className='input-group-text'><MathJax inline={true}>{"\\(\\ p(u) \\)"}</MathJax></span>
                    <select id='distribution-type' className='form-select'>
                        <option value="uniform">Равномерный</option>
                        <option value="normal">Нормальный</option>
                        <option value="exponential">Показательный</option>
                    </select>
                    <button onClick={()=>calculateRvs(document.querySelector("#n"), document.querySelector("#distribution-type"))}
                    className='btn btn-sm btn-success' type='button'>Расчитать</button>
                </div>
            </div>
        </div>
        {/* Расчитанные показатели */}
        {
            state.mean && <div className="row mb-5">
            <div className='col-10'>
                <h6>Рассчитанные значения</h6>
                <ul className=''>
                    <li>
                        <MathJax inline={true}>{`\\(\\ \\bar{M}(x)=${state.mean} \\)`}</MathJax> 
                    </li>
                    <li>
                        <MathJax inline={true}>{`\\(\\ \\bar{D}(x)=${state.variance} \\)`}</MathJax> 
                    </li>
                    <li>
                        <MathJax inline={true}>{`\\(\\ \\bar{\\sigma}(x)=${state.standardDeviation} \\)`}</MathJax> 
                    </li>
                    <li>
                        <button className="btn btn-sm btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Показать выборку <MathJax inline={true}>{"\\(\\ (x^i, i=\\overline{1,n}) \\)"}</MathJax>
                        </button>
                        <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                                [
                                    <ol>
                                        {state.array.map((item, iter) => <li key={iter}>{item}</li>)}
                                    </ol>
                                ]
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        }
        {/* Оценка ФРВ */}
        {
            state.cdf && <Plot data={[
                {
                    x: state.array,
                    y: state.cdf,
                    type: 'scatter',
                    mode: 'lines+markers',
                }
            ]}
            layout={{
                title: state.title,
                xaxis: {
                    title: "x"
                },
                yaxis: {
                    title: "P(x)"
                }
            }}
        />
        }
    </div>
}