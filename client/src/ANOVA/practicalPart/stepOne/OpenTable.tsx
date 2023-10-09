import * as React from 'react'
import { useDataDescription } from './dataDescriptionStore'
import { setEmptyMatrixHandler } from './setEmptyMatrixHandler'


export const OpenTable = () => {
    const setDescription = useDataDescription(state => state.setDescription)
    const setHeaderX = useDataDescription(state => state.setHeaderX)
    const setHeaderY = useDataDescription(state => state.setHeaderY)
    const setRows = useDataDescription(state => state.setRows)
    const setCols = useDataDescription(state => state.setCols)
    const setFactors = useDataDescription(state => state.setFactors)
    const setData = useDataDescription(state => state.setData)

    


    const read = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        let reader = new FileReader()
        reader.readAsText(inputFile)
        reader.onload = () => {
            let result = (reader.result as string).split('\n').filter(row => row !== '')
            const clearString = (string: string) => string.replace(/"\"|\r|\n|"/g, '').split(',')
            let firstLine = clearString(result[0])
            let secondLine = clearString(result[1])
            setDescription(firstLine[0])
            setHeaderX(firstLine[1])
            setHeaderY(firstLine[2])
            let cols = secondLine.length
            setCols(cols)
            console.log(result)
            console.log(result.slice(1,))
            let dataFromFile = result.slice(2,)
            let rows = dataFromFile.length

            setRows(rows)

            setData(setEmptyMatrixHandler(rows, cols))
            setFactors(secondLine.reduce((accum, cur, index) => ({...accum, [index]: cur}), {}))
            let d = {} as any
            dataFromFile.forEach((row: string, i) => {
                let elems = clearString(row)
                elems.forEach((item, j) => {
                    d[i] = {...d[i], [`x_${i}${j}`]: item}
                })
            })
            setData(d)

        }
    //     calculatedANOVA({
    //         yHeaders: [] as Array<string>,
    //         toInteger: false,
    //         y11:0,
    //         y21:0,
    //         dataMinusAvr: [] as Array<Array<number>>,
    //         squareData: [] as Array<Array<number>>,
    //         overallAverage: 0 as number,
    //         Qj: [] as Array<number>,
    //         Tj: [] as Array<number>,
    //         Tj2: [] as Array<number>,
    //         sumQj: 0,
    //         sumTj: 0,
    //         sumTj2: 0,
    //         equivalenceLevelsF: true,
    //         sTotal: 0,
    //         n: 0,
    //         sFact: 0,
    //         columnN: [],
    //         sRemainder: 0,
    //         s2Fact: 0,
    //         s2Remainder: 0,
    //         fObservation: 0,
    //         fCrit: 0,
    //         h0: false
    //     })
    }


    return <div className='row justify-content-center mt-3'>
        <div className='col-auto'>
            <div className='input-group input-group-sm'>
                <input className="form-control" type="file" accept='.csv' id="formFile" onChange={()=>read()}/>
                <span className="input-group-text" >Файл CSV</span>
            </div>
        </div>
    </div>
}