import { useLazyQuery } from '@apollo/client'
import * as React from 'react'
import { UPLOAD_DATA } from '../query'
import { data1 } from '../rv'


export const DataUploader = () => {
    const [upload] = useLazyQuery(UPLOAD_DATA, {onCompleted: data => data1({...data.uploadData})})

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

    return <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Файл CSV</label>
            <input className="form-control" type="file" id="formFile" />
            <button onClick={()=>read()} className='btn btn-sm btn-success mt-2' type='button'>Upload</button>
        </div>
}