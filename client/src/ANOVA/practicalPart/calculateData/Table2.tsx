import * as React from 'react'
import { MathJax } from 'better-react-mathjax'
import { useDataDescription } from '../stepOne/dataDescriptionStore'
import { useFirstStepData } from '../stepOne/FirstStepStore'


export const Table2 = () => {
    const factors = Object.values(useDataDescription().factors)
    const headerX = useDataDescription().headerX
    const headerY = useDataDescription().headerY
    const data = Object.values(useDataDescription().data).map(row => Object.values(row))
    const groupAverages = useFirstStepData().group_averages
    
    return <div className='mt-3 mb-4'>
        <div className='row justify-content-center'>
            <div className='col'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center align-middle" scope="col" rowSpan={2}>Номер<br/>наблюдений<br/>({headerY})</th>
                            <th className="text-center" scope="col" colSpan={factors.length}>{headerX}</th>
                        </tr>
                        <tr>
                            { factors.map((F: string, iter: number) =>
                                <th key={"factor-"+ iter+1} scope="col" className='text-center'>{F}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((xi: Array<number>, i: number) => 
                            <tr key={"observation-"+ i+1}>
                                
                                <th scope='row' className='text-center'>{i+1}</th>
                                { xi.map((xij: number, j: number) => 
                                    <td key={"xij-"+ `${i+1}` + `${j+1}`} scope="col" className='text-center'>{xij}</td>
                                )}
                            </tr>
                        )}
                        <tr>
                            <th scope='row' className='text-center'>
                                <MathJax inline={true}>{"\\(\\ \\bar{x}_{\\text{гр}} \\)"}</MathJax>
                            </th>
                            { groupAverages.map((average, iter) => 
                                <td key={"group-average-" + iter} className='text-center'>{average}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className='row justify-content-center'>
            <div className='col text-center'>
                <p className='fw-light'>Таблица 2.</p>
            </div>
        </div>
    </div>
}