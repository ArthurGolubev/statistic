import * as React from 'react'
import { useDataDescription } from './dataDescriptionStore'
import { TableLayoutValidate } from './TableLayoutValidate'

export const SaveToCSV = () => {
    const headerX = useDataDescription(state => state.headerX)
    const headerY = useDataDescription(state => state.headerY)
    const factors = useDataDescription(state => state.factors)
    const data = useDataDescription(state => state.data) as any
    const description = useDataDescription(state => state.description)

    const CreateCSV = () => {
        if(TableLayoutValidate(data)){
            let csvRows = []
            let fileName = (document.querySelector("#file-name") as HTMLInputElement).value ?? 'data.csv'
            csvRows.push([description, headerX, headerY].join(','))
            csvRows.push('\r\n')
            csvRows.push(Object.values(factors).join(',') )
            csvRows.push('\r\n')
            Object.values(data).forEach((row: Array<string>) => 
                csvRows.push(Object.values(row).map(i => i === '' ? '""' : i)
                .join(',') + '\r\n' ))
            // csvRows.push('\n')
    
            let blob = new Blob(csvRows, {type: 'text/csv'})
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = fileName
            a.click()
            console.log(csvRows)
        }
    }

    return <div className='row justify-content-center'>
        <div className='col-12'>
            
            <div className='row m-1'>
                <div className='col-12'>
                    <div className='input-group input-group-sm g-2'>
                        <input className='form-control' type="text" placeholder='Имя файла CSV' id="file-name"/>
                        <button onClick={()=>CreateCSV()} className='btn btn-sm btn-success' type='button'>Сохранить</button>
                    </div>        
                </div>
            </div>

        </div>
    </div>
}