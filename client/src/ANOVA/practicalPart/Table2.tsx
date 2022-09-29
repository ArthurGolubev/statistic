import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { data1 } from '../rv'
import { MathJax } from 'better-react-mathjax'


export const Table2 = () => {
    const dataSub = useReactiveVar(data1)
    console.log('123 ->', dataSub)
    
    return <div className='mt-3 mb-4'>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="text-center align-middle" scope="col" rowSpan={2}>Номер<br/>наблюдений</th>
                    <th className="text-center" scope="col" colSpan={dataSub.data[2].length}>{dataSub.data[0][1]}</th>
                </tr>
                <tr>
                    { dataSub.data[1].map((F: number, iter: number) =>
                        <th key={"factor-"+ iter+1} scope="col" className='text-center'>{F}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                { dataSub.data.slice(2).map((xi: Array<number>, i: number) => 
                    <tr key={"observation-"+ i+1}>
                        
                        <th scope='col' className='text-center'>{i+1}</th>
                        { xi.map((xij: number, j: number) => 
                            <td key={"xij-"+ `${i+1}` + `${j+1}`} scope="col" className='text-center'>{xij}</td>
                        )}
                    </tr>
                )}
                <tr>
                    <th scope='col' className='text-center'>
                        <MathJax inline={true}>{"\\(\\ \\bar{x}_{\\text{гр}} \\)"}</MathJax>
                    </th>
                    { dataSub.groupAverages.map((average, iter) => 
                        <td key={"group-average-" + iter} scope='col' className='text-center'>{average}</td>
                    )}
                </tr>
            </tbody>
        </table>
    </div>
}