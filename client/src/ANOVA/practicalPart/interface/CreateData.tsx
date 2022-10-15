import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { createData } from './rv'


export const CreateData = () => {
    const createdDataSub = useReactiveVar(createData)

    const setData = () => {
        let rows = parseInt((document.querySelector("#rows") as HTMLInputElement).value)
        let cols = parseInt((document.querySelector("#cols") as HTMLInputElement).value)
        let data = {} as any
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                data[i] = {...data[i], [`x_${i}${j}`]: ''}
            }
        }
        createData({
            ...createdDataSub,
            data,
            show: true
        })
    }



    const setX = (x: string, i: number, j: number) => {
        createData({...createdDataSub, data: {
            ...createdDataSub.data,
            [i]: {
                ...createdDataSub.data[i],
                [`x_${i}${j}`]: x}
            } })
    }



    const CreateCSV = () => {
        let csvRows = []
        let description = `"${(document.querySelector("#description") as HTMLInputElement).value}"` ?? ''
        let fileName = (document.querySelector("#file-name") as HTMLInputElement).value ?? 'data.csv'
        csvRows.push([description, createdDataSub.headerX, createdDataSub.headerY].join(','))
        csvRows.push('\n')
        csvRows.push(Object.values(createdDataSub.factors).join(',') )
        csvRows.push('\n')
        Object.values(createdDataSub.data).forEach((row: Array<string>) => 
            csvRows.push(Object.values(row).map(i => i === '' ? '""' : i)
            .join(',') + '\n' ))
        csvRows.push('\n')

        let blob = new Blob(csvRows, {type: 'text/csv'})
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        console.log(csvRows)


    }



    return <div className='mb-3 pt-3'>
        <div className='m-1'>
            <h6>Создание таблицы наблюдений</h6>
            <div className='row m-1'>
                <div className='col-12'>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Описание задачи..." id="description" style={{height: "150px"}}/>
                        <label htmlFor="floatingTextarea">Описание задачи</label>
                    </div>
                </div>
            </div>
            <div className='row m-1'>
                <div className='col-7'>
                    <div className='input-group'>
                        <input className='form-control' type="text" placeholder='Исследуемый фактор (Количество осадков)'
                        onChange={(e) => createData({...createdDataSub, headerX: `"${e.target.value}"` })}/>
                    </div>
                </div>
            </div>
            <div className='row m-1'>
                <div className='col-7'>
                    <div className='input-group'>
                        <input className='form-control' type="text" placeholder='Полученные результаты (Тонн пшеницы)'
                        onChange={(e) => createData({...createdDataSub, headerY: `"${e.target.value}"`})}/>
                    </div>
                </div>
            </div>
            <div className='row m-1'>
                <div className='col-7'>
                    <div className='input-group'>
                        <input className='form-control' type="number" placeholder='Количество столбцов' id="cols" min={3}/>
                    </div>        
                </div>
            </div>
            <div className='row m-1'>
                <div className='col-7'>
                    <div className='input-group'>
                        <input className='form-control' type="number" placeholder='Количество строк' id="rows" min={3}/>
                    </div>        
                </div>
            </div>
            <div className='row m-1'>
                <div className='col-7'>
                    <div className='input-group'>
                        <input className='form-control' type="text" placeholder='Имя файла CSV' id="file-name" min={3}/>
                    </div>        
                </div>
            </div>
            <button onClick={()=>setData()} className='btn btn-sm btn-success m-1' type='button'>Создать</button>
            <button onClick={()=>console.log(createdDataSub)} className='btn btn-sm btn-success m-1' type='button'>data</button>
            <button onClick={()=>Object.keys(createdDataSub.data).map(() => console.log(1))} className='btn btn-sm btn-success m-1' type='button'>test</button>
            {/* -------------------------------------------Вариант 2-Start------------------------------------------ */}
            {
                createdDataSub.show && 
                <div className='m-2 mt-5'>
                    {
                        <div className='input-group mb-4'>
                            <span className="input-group-text">0</span>
                            {
                                Object.keys(createdDataSub.data[0]).map((_: any, iter: number) =>
                                <input type="text" className="form-control" key={iter} placeholder={`Ур.Фактора-` + (iter + 1)} id={"f-"+iter}
                                onChange={(e)=>createData({
                                    ...createdDataSub, 
                                    factors: {
                                        ...createdDataSub.factors,
                                        [iter]: `"${e.target.value}"`
                                    }
                                }
                                )}/>)
                            }
                        </div>
                    }
                    {
                        Object.keys(createdDataSub.data).map((_: any, i: number) => 
                            <div className='input-group mb-1' key={"row-" + i}>
                                <span className="input-group-text">{i+1}</span>
                                { Object.keys(createdDataSub.data[0]).map((_: any, j: number) => 
                                <input type="number" className="form-control"  key={j}
                                onChange={(e)=>setX(e.target.value, i, j)} />
                                ) }
                            </div>    
                        )
                    }
                </div>
            }
            {/* -------------------------------------------Вариант 2-End-------------------------------------------- */}
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <button onClick={()=>CreateCSV()} className='btn btn-sm btn-primary' type='button'>Создать CSV</button>
            </div>
        </div>
    </div>
}