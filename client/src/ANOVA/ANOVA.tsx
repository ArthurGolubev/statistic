import { useLazyQuery } from '@apollo/client'
import * as React from 'react'
import { GeneralTable } from './GeneralTable'
import { UPLOAD_DATA } from './query'

export const ANOVA = () => {

    const [upload, {data, loading}] = useLazyQuery(UPLOAD_DATA)

    const read = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        let reader = new FileReader()
        reader.addEventListener('load', e =>{
            console.log(e.target.result)
            console.log(JSON.stringify( e.target.result))
            upload({variables: {data: e.target.result}, fetchPolicy: "network-only"})
            }
        )
        reader.readAsText(inputFile)
    }
    return <div>
        <h5 className='text-center mb-4'>Вычисления однофакторного дисперсионного анализа</h5>
        <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Файл CSV</label>
            <input className="form-control" type="file" id="formFile" />
        </div>
        <button 
        onClick={()=>read()}
        className='btn btn-sm btn-success' type='button'>Upload</button>
        <div>
            {data && !loading && <GeneralTable data={data.uploadData} />}
        </div>
    </div>
}