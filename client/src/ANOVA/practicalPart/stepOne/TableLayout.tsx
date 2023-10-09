import * as React from 'react'
import { useDataDescription } from './dataDescriptionStore'
import { SaveToCSV } from './SaveToCSV'
import { ax } from '../../axiosInstance'
import { useFirstStepData } from './FirstStepStore'
import { TableLayoutValidate } from './TableLayoutValidate'


export const TableLayout = () => {
    const data = useDataDescription(state => state.data) as any
    const setData = useDataDescription(state => state.setData)
    const factors = useDataDescription(state => state.factors) as { [ket: number]: '' }
    const setFactors = useDataDescription(state => state.setFactors)
    const setFirstStepData = useFirstStepData().setFirstStepData

    const [savePanel, setSavePanel] = React.useState(false)
    
    const calculateFirstStepHandler = () => {
        if(TableLayoutValidate(data)){
            ax.post('/anova/input-data-from-file', {
                factors: Object.values(factors),
                data: Object.values(data).map(row => Object.values(row))
            }).then(data => {
                setFirstStepData(data.data)
            })
        }
    }


    return <div className='m-2 mt-5'>
        <h6>Все поля обязательны для заполнения</h6>
        {
            <div className='input-group mb-4'>
                <span className="input-group-text">0</span>
                {
                    Object.keys(data[0]).map((_: any, iter: number) =>
                        <input
                            value={factors[iter] ?? ''}
                            type="text" className="form-control" key={iter} placeholder={`Ур.Фактора-` + (iter + 1)} id={"f-" + iter}
                            onChange={(e) => setFactors({
                                ...factors,
                                [iter]: `${e.target.value}`
                            })
                            } />)
                }
            </div>
        }
        {
            Object.keys(data).map((_: any, i: number) =>
                <div className='input-group mb-1' key={"row-" + i}>
                    <span className="input-group-text">{i + 1}</span>
                    {Object.keys(data[0]).map((_: any, j: number) =>
                        <input
                            id={`cell-x_${i}${j}`}
                            value={data[i][`x_${i}${j}`] ?? ''}
                            type="number" className="form-control" key={j}
                            onChange={(e) => setData({
                                ...data,
                                [i]: {
                                    ...data[i],
                                    [`x_${i}${j}`]: e.target.value
                                }
                            })} />
                    )}
                </div>
            )
        }
        <div className='row justify-content-center mt-3'>
            <div className='col-auto'>
                <button onClick={() => calculateFirstStepHandler()} className='btn btn-sm btn-primary' type='button'>Рассчитать</button>
            </div>
            <div className='col-auto'>
                <button onClick={() => setSavePanel(!savePanel)} className='btn btn-sm btn-primary' type='button'>Сохранить в CSV</button>
            </div>
        </div>
        {savePanel && <SaveToCSV />}
    </div>
}