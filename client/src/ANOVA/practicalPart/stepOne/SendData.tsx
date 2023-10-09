import * as React from 'react'
import { MathJax } from 'better-react-mathjax'
import { useDataDescription } from './dataDescriptionStore'
import { ax } from '../../axiosInstance'
import { useFirstStepData } from './FirstStepStore'
import { useSecondStep } from '../calculateData/SecondStepStore'


export const SendData = () => {
    const setAlpha = useDataDescription().setAlpha
    const setPercision = useDataDescription().setPercision
    const alpha = useDataDescription().alpha
    const precision = useDataDescription().precision
    const data = useDataDescription().data
    const group_averages = useFirstStepData().group_averages
    const factors = useDataDescription().factors
    const setSecondStep = useSecondStep().setState
    const st = useSecondStep()

    const calculate = () => {
        let isNotEmpty = true
        if(precision === undefined){
            document.querySelector("#precision").className = 'form-control is-invalid'
            isNotEmpty = false
        } else {
            document.querySelector("#precision").className = 'form-control is-valid'
        }
        if(alpha === undefined){
            document.querySelector("#alpha").className = 'form-control is-invalid'
            isNotEmpty = false
        } else {
            document.querySelector("#alpha").className = 'form-control is-valid'
        }

        if(isNotEmpty){
            ax.post('/anova/calculate-single-anova', {
                data: Object.values(data).map(row => Object.values(row)),
                precision,
                alpha,
                factors: Object.values(factors),
                averages: group_averages,
            }).then(data => setSecondStep(data.data))
        }
    }


    return <div className='row justify-content-center mb-5'>
        <div className='col-12'>
            <div className='input-group input-group-sm mt-2'>
                <span className='input-group-text'>Точность</span>
                <input
                value={precision ?? ''}
                onChange={e => setPercision(parseInt(e.target.value))}
                placeholder='знаков после запятой (2)' className='form-control' type='number' min={1} max={5} id="precision" />
                <span className='input-group-text'><MathJax inline={true}>{"\\( \\alpha \\)"}</MathJax></span>
                <input
                value={alpha ?? ''}
                onChange={e => setAlpha(parseFloat(e.target.value))}
                placeholder='уровень значимости (0.05)' className='form-control' type='number' step={.01} min={0.01} id="alpha" />
                <button onClick={()=>calculate()} className='btn btn-success' type='button'>Рассчитать таблицу</button>
            </div>
        </div>
    </div>
}