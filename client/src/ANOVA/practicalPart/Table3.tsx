import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { data1 } from '../rv'

export const Table3 = () => {
    
    const dataSub = useReactiveVar(data1)
    console.log('123 ->', dataSub)
    
    const header2 = () => {
        let headers = dataSub.dataMinusAvr[1].map((_: any, iter: number) => [
        <MathJax inline={true}>{`\\(\\ x_{j${iter+1}} \\)`}</MathJax>,
        <MathJax inline={true}>{`\\(\\ x^2_{j${iter+1}} \\)`}</MathJax>,
    ])
        return headers
    }
    
    return <div className='mt-3 mb-4'>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="text-center align-middle" scope="col" rowSpan={3}>Номер<br/>наблюдений</th>
                    <th className="text-center" scope="col" colSpan={dataSub.dataMinusAvr[2].length}>{dataSub.dataMinusAvr[0][1]}</th>
                    <th className='text-center align-middle' scope='col' rowSpan={3}>Итоговый<br/>столбец</th>
                </tr>
                <tr>
                    { dataSub.dataMinusAvr[1].map((F: number, iter: number) =>
                        <th colSpan={2} key={"factor-"+ iter+1} scope="col" className='text-center'>{F}</th>
                    )}
                </tr>
                <tr>
                    { header2().map((headers: Array<any>, iter: number) => headers.map((header: any, iter: number) => 
                            <th key={"factor-"+ iter+1} scope="col" className='text-center'>{header}</th>
                        )
                    )}
                </tr>
                
            </thead>
            <tbody>
                { dataSub.dataMinusAvr.slice(2).map((xi: Array<number>, i: number) => 
                    <tr key={"observation-"+ i+1}>
                        
                        <th scope='col' className='text-center'>{i+1}</th>
                        { xi.map((xij: number, j: number) => 
                            <td key={"xij-"+ `${i+1}` + `${j+1}`} scope="col" className='text-center'>{xij}</td>
                        )}
                    </tr>
                )}
                <tr className='border-top border-3'>
                    <th scope='col' className='text-center'>
                        <MathJax inline={true}>{"\\(\\ Q_j = \\sum y^2_{ij} \\)"}</MathJax>
                    </th>
                    { dataSub.Qj.map((Qj: number, iter: number) => 
                            <td key={"Qj-" + iter } scope="col" className='text-center'>{Qj}</td>
                    )}
                </tr>
                <tr>
                    <th scope='col' className='text-center'>
                        <MathJax inline={true}>{"\\(\\ T_j = \\sum y_{ij} \\)"}</MathJax>
                    </th>
                    { dataSub.Tj.map((Tj: number, iter: number) => 
                            <td key={"Tj-" + iter } scope="col" className='text-center'>{Tj}</td>
                    )}
                </tr>
                <tr>
                    <th scope='col' className='text-center'>
                        <MathJax inline={true}>{"\\(\\ T^2_j \\)"}</MathJax>
                    </th>
                    { dataSub.Tj2.map((Tj2: number, iter: number) => 
                            <td key={"Tj2-" + iter } scope="col" className='text-center'>{Tj2}</td>
                    )}
                </tr>

            </tbody>
        </table>
    </div>
}