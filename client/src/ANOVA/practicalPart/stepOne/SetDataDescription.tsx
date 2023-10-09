import * as React from 'react'
import { TableLayout } from './TableLayout'
import { useDataDescription } from './dataDescriptionStore'
import { DataDescriptionValidation } from './DataDescriptionValidation'
import { useInterface } from '../../../interfaceStore'
import { OpenTable } from './OpenTable'
import { setEmptyMatrixHandler } from './setEmptyMatrixHandler'


export const SetDataDescription = () => {
    const setHeaderX = useDataDescription(state => state.setHeaderX)
    const setHeaderY = useDataDescription(state => state.setHeaderY)
    const showTableLayout = useDataDescription(state => state.showTableLayout)
    const setData = useDataDescription(state => state.setData)
    const setOpenTable = useInterface(state => state.setOpenTable)
    const openTable = useInterface(state => state.openTable)
    const setDescription = useDataDescription(state => state.setDescription)
    const description = useDataDescription(state => state.description)
    const headerX = useDataDescription().headerX
    const headerY = useDataDescription().headerY
    const rows = useDataDescription().rows
    const cols = useDataDescription().cols
    const setRows = useDataDescription().setRows
    const setCols = useDataDescription().setCols
    const data = useDataDescription().data

    const [alert, setAlert] = React.useState(undefined)

    const CreateTable = () => {
        let isValid = DataDescriptionValidation()
        if(isValid.status){
            setAlert(undefined)
            setData(setEmptyMatrixHandler(rows, cols))
            
        } else {
            setAlert(isValid.msg)
        }
    }


    return <div className='mb-3 pt-3'>
        <div className='m-1'>
            <h6>Создание таблицы наблюдений</h6>
            <div className='row m-1'>
                <div className='col-12'>
                    <div className="form-floating">
                        <textarea
                        id="description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        className="form-control" placeholder="Описание задачи..." style={{height: "150px"}}/>
                        <label htmlFor="floatingTextarea">Описание задачи</label>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-7'>

                    <div className='row m-1'>
                        <div className='col-12'>
                            <div className='input-group'>
                                <input 
                                id="headerX"
                                value={headerX}
                                className='form-control' type="text" placeholder='Исследуемый фактор (Количество осадков)'
                                onChange={(e) => setHeaderX(`${e.target.value}`)}/>
                            </div>
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-12'>
                            <div className='input-group'>
                                <input
                                id="headerY"
                                value={headerY}
                                className='form-control' type="text" placeholder='Полученные результаты (Тонн пшеницы)'
                                onChange={(e) => setHeaderY(`${e.target.value}`)}/>
                            </div>
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-12'>
                            <div className='input-group'>
                                <input
                                id="cols"
                                value={cols ?? ''}
                                onChange={e => setCols(parseInt(e.target.value))}
                                className='form-control' type="number" placeholder='Количество столбцов' min={3}/>
                            </div>        
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-12'>
                            <div className='input-group'>
                                <input
                                id="rows"
                                value={rows ?? ''}
                                onChange={e => setRows(parseInt(e.target.value))}
                                className='form-control' type="number" placeholder='Количество строк' min={3}/>
                            </div>        
                        </div>
                    </div>                    
                </div>
                <div className='col-5'>
                    <div className='row m-1'>
                        <div className='col-12'>
                            {alert && alert}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center g-3 mt-3'>
                <div className='col-auto'>
                    <button onClick={()=>CreateTable()} className='btn btn-sm btn-success' type='button'>Создать таблицу</button>
                </div>
                <div className='col-auto'>
                    <button onClick={()=>setOpenTable(!openTable)} className='btn btn-sm btn-success' type='button'>Открыть таблицу</button>
                </div>
            </div>

            {/* -------------------------------------------Открыть-таблицу-Start------------------------------------------ */}
            {openTable && <OpenTable />}
            {/* -------------------------------------------Открыть-таблицу-End-------------------------------------------- */}
            {/* -------------------------------------------Вариант 2-Start------------------------------------------ */}
            { (showTableLayout || Object.values(data).length > 0) && <TableLayout /> }
            {/* -------------------------------------------Вариант 2-End-------------------------------------------- */}
        </div>
        
    </div>
}