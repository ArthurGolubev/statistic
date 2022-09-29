import { useLazyQuery } from '@apollo/client'
import * as React from 'react'
import { UPLOAD_DATA } from '../query'
import { data1 } from '../rv'


export const DataUploader = () => {
    const [upload] = useLazyQuery(UPLOAD_DATA, {onCompleted: data => data1({...data.uploadData})})
    const [state, setState] = React.useState({file: false})

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
        <div className='row justify-content-center'>
            <div className='col-10'>
                <label htmlFor="formFile" className="form-label">Файл CSV</label>
                <input className="form-control" type="file" accept='.csv' id="formFile" onChange={()=>setState({file: true})}/>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <button disabled={!state.file} onClick={()=>read()} className='btn btn-sm btn-success mt-2' type='button'>Открыть CSV</button>
            </div>
        </div>
    </div>
}