import { useLazyQuery, useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { CALCULATE_ANOVA, OPEN_CSV } from '../query'
import { calculatedANOVA, openCSV } from '../rv'


export const DataUploader = () => {
    const openCSVSub = useReactiveVar(openCSV)
    const [upload] = useLazyQuery(OPEN_CSV, {onCompleted: data => openCSV({...data.uploadData})})
    const [calculateANOVA] = useLazyQuery(CALCULATE_ANOVA, {onCompleted: data => calculatedANOVA({...data.calculatedANOVA})})

    const [state, setState] = React.useState({file: false})

    const read = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        let reader = new FileReader()
        reader.readAsText(inputFile)
        reader.onload = () => upload({variables: {data: reader.result}, fetchPolicy: "network-only"})
    }

    const calculate = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        // let precision = document.querySelector("#precision") as HTMLInputElement
        let reader = new FileReader()
        reader.readAsText(inputFile)
        reader.onload = () => calculateANOVA({variables: {
            data: reader.result,
            precision: 3,
            averages: openCSVSub.groupAverages
        }})
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
            <div className='col-auto'>
                <button disabled={!state.file} onClick={()=>calculate()} className='btn btn-sm btn-success mt-2' type='button'>Рассчитать</button>
            </div>
        </div>
    </div>
}