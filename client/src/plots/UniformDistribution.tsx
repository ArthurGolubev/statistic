import * as React from 'react'
import Plot from 'react-plotly.js'
import { ax } from '../ANOVA/axiosInstance'


export const UniformDistribution = () => {
    const [state, setState] = React.useState([{chart_id: 1, n: null, data: {x: [], y: []}}] )

    const calculate = (n: HTMLInputElement, chart_id: number) => {
        ax.post('/destribution/calculate', { n: parseInt(n.value), distribution_type: 'uniform' }).then(data => {
            let new_chart = {chart_id, n, data: {x: data.data.x, y: data.data.y}}
            let chart = state.filter(chart => chart.chart_id !== chart_id).concat(new_chart)
            setState(chart.sort((a, b) => a.chart_id - b.chart_id))
        })
    }


    return <div className='col text-center'>
        <h4>Равномерное распределение</h4>
        {/* Диаграмма */}
        {
            <Plot 
                data={
                    state.map((chart, iter) => {
                        return {
                            x: chart.data.x,
                            y: chart.data.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                        }
                    })
                }
                layout={{title: 'Uniform Distribution'}}
            />
        }
        {/* Граффики со следующими параметрами: */}
        <ol className='list-group list-group-numbered list-group-flush mb-1'>
        {
            Object.keys(state).map((chart_id, iter) => <li className='list-group-item'>
                <div className='input-group input-group-sm mb-3'>
                    <span className='input-group-text'><i>n:</i></span>
                    <input id={"uniform-distribution"+iter} type='number' className='form-control' placeholder='Количество наблюдений...' />
                    {/* <span className='input-group-text'></span> */}
                    <button onClick={()=>calculate(document.querySelector("#uniform-distribution"+iter), iter+1)} 
                    className='btn btn-sm btn-success' type='button'>Расчитать</button>
                </div>
            </li>
            )
        }
        </ol>
        {/* Добавить график */}
        {
            Object.keys(state).length < 3 && <button onClick={
                ()=>setState([...state, {chart_id: Object.keys(state).length+1, n: null, data: {x: [], y: []}}])
            } className='btn btn-sm btn-success' type='button'>+</button>
        }
    </div>

}