import { useLazyQuery, useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { CALCULATE_ANOVA, OPEN_CSV } from '../../query'
import { calculatedANOVA, openCSV } from '../../rv'


export const OpenData = () => {
    const openCSVSub = useReactiveVar(openCSV)
    const [upload] = useLazyQuery(OPEN_CSV, {onCompleted: data => openCSV({...data.openCsv})})
    const [calculateANOVA] = useLazyQuery(CALCULATE_ANOVA, {onCompleted: data => calculatedANOVA({...data.calculateAnova})})


    const read = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        let reader = new FileReader()
        reader.readAsText(inputFile)
        reader.onload = () => upload({variables: {data: reader.result}, fetchPolicy: "network-only"})
        calculatedANOVA({
            yHeaders: [] as Array<string>,
            toInteger: false,
            y11:0,
            y21:0,
            dataMinusAvr: [] as Array<Array<number>>,
            squareData: [] as Array<Array<number>>,
            overallAverage: 0 as number,
            Qj: [] as Array<number>,
            Tj: [] as Array<number>,
            Tj2: [] as Array<number>,
            sumQj: 0,
            sumTj: 0,
            sumTj2: 0,
            equivalenceLevelsF: true,
            sTotal: 0,
            n: 0,
            sFact: 0,
            columnN: [],
            sRemainder: 0,
            s2Fact: 0,
            s2Remainder: 0,
            fObservation: 0,
            fCrit: 0,
            h0: false
        })
    }

    const calculate = () => {
        let inputFile = (document.querySelector("#formFile") as HTMLInputElement).files[0]
        let precision = document.querySelector("#precision") as HTMLInputElement
        let alpha = document.querySelector("#alpha") as HTMLInputElement
        let reader = new FileReader()
        reader.readAsText(inputFile)
        reader.onload = () => calculateANOVA({variables: {
            data: reader.result,
            precision: parseInt(precision.value) ? parseInt(precision.value) : 2,
            alpha: parseInt(alpha.value) ? parseInt(precision.value) : 0.05,
            averages: openCSVSub.groupAverages
        }})
    }

    return <div className="mb-3 pt-3">
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <div className='input-group input-group-sm'>
                    <input className="form-control" type="file" accept='.csv' id="formFile" onChange={()=>read()}/>
                    <span className="input-group-text" >Файл CSV</span>
                </div>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-11'>
                <div className='input-group input-group-sm m-3'>
                    <span className='input-group-text'>Точность</span>
                    <input placeholder='знаков после запятой (2)' className='form-control' type='number' min={1} max={5} id="precision" />
                    <span className='input-group-text'><MathJax inline={true}>{"\\( \\alpha \\)"}</MathJax></span>
                    <input placeholder='уровень значимости (0.05)' className='form-control' type='number' step={.01} min={0.01} id="alpha" />
                    <button disabled={openCSVSub.data.length == 0} onClick={()=>calculate()} className='btn btn-success' type='button'>Рассчитать</button>
                </div>
            </div>
        </div>
    </div>
}