import { useReactiveVar } from "@apollo/client"
import * as React from "react"
import Plot from "react-plotly.js"
import { openCSV } from "../rv"


export const Plot1 = () => {
    const openCSVSub = useReactiveVar(openCSV)
    // TODO 
    // 1. посчитать среднии для каждого фактора - ЕСТЬ
    // 2. 

    return <div className="mt-3">
        <Plot data={[
        {
            x: openCSVSub.factors,
            y: openCSVSub.groupAverages,
            error_y: {
                type: 'data',
                array: openCSVSub.errorMax,
                arrayminus: openCSVSub.errorMin,
                visible: true
            },
            type: 'scatter',
            name: 'Групповая средная'
        },
        {
            x: openCSVSub.dotsX,
            y: openCSVSub.dotsY,
            mode: 'markers',
            type: 'scatter',
            name: 'Наблюдение'
        }
        ]}
        layout={{
            title: `Влияние ${openCSVSub.header1.toLowerCase()} на ${openCSVSub.header2.toLowerCase()}`,
            xaxis: {
                title: openCSVSub.header1,
            },
            yaxis: {
                title: openCSVSub.header2,
            },
        }}
        />
        <div className='row justify-content-center'>
            <div className='col text-center'>
                <p className='fw-light'>Диаграмма 1</p>
            </div>
        </div>

        <p className="mt-3">
            Благодоря диаграмме 1 мы можем увидеть, что между статистическими показателями есть некоторая разница, 
            чтобы проверить является ли эта разница статистически важна следует смотреть на результаты 
            однофакторного дисперсионного анализа.
        </p>
    </div>
}