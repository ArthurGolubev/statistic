import * as React from "react"
import Plot from "react-plotly.js"
import { useDataDescription } from "../stepOne/dataDescriptionStore"
import { useFirstStepData } from "../stepOne/FirstStepStore"


export const Plot1 = () => {
    const factors = Object.values(useDataDescription().factors)
    const headerX = useDataDescription().headerX
    const headerY = useDataDescription().headerY
    const groupAverages = useFirstStepData().group_averages
    const errorMax = useFirstStepData().error_max
    const errorMin = useFirstStepData().error_min
    const dotsX = useFirstStepData().dots_x
    const dotsY = useFirstStepData().dots_y

    return <div className="mt-3">
        <Plot data={[
        {
            x: factors,
            y: groupAverages,
            error_y: {
                type: 'data',
                array: errorMax,
                arrayminus: errorMin,
                visible: true
            },
            type: 'scatter',
            name: 'Групповая средная'
        },
        {
            x: dotsX,
            y: dotsY,
            mode: 'markers',
            type: 'scatter',
            name: 'Наблюдение'
        }
        ]}
        layout={{
            title: `Влияние ${headerX.toLowerCase()} на ${headerY.toLowerCase()}`,
            xaxis: {
                title: headerX,
            },
            yaxis: {
                title: headerY,
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