import * as React from 'react'
import { MathJax } from 'better-react-mathjax'
import { useDataDescription } from '../stepOne/dataDescriptionStore'
import { useSecondStep } from './SecondStepStore'

export const Table3 = () => {
    const y_headers = useSecondStep().y_headers
    const Qj = useSecondStep().Qj
    const Tj = useSecondStep().Tj
    const Tj2 = useSecondStep().Tj2
    const sum_Tj = useSecondStep().sum_Tj
    const sum_Tj2 = useSecondStep().sum_Tj2
    const sum_Qj = useSecondStep().sum_Qj
    const data_minus_avr = useSecondStep().data_minus_avr
    const factors = Object.values(useDataDescription().factors)
    const headerX = useDataDescription().headerX
    
    return <div className='mt-3 mb-4' style={{pageBreakBefore: 'always'}}>
        
        <div className='row justify-content-center'>
            <div className='col'>
                <div className='table-responsive'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center align-middle" scope="col" rowSpan={3}>Номер<br/>наблюдений</th>
                                <th className="text-center" scope="col" colSpan={factors.length * 2}>{headerX}</th>
                                <th className="text-center align-middle" scope="col" rowSpan={3}>Итоговый<br/>столбец</th>
                            </tr>
                            <tr>
                                { factors.map((F: string, iter: number) =>
                                    <th key={"factor-"+ iter+1} scope="col" colSpan={2} className='text-center'>{F}</th>
                                )}
                            </tr>
                            <tr>
                                { 
                                    y_headers.map((yHeader: any, iter: number) =>
                                        <th key={"factor-"+ iter+1} scope="col" className='text-center'>
                                            <MathJax inline={true}>{`\\(\\ ${yHeader} \\)`}</MathJax>
                                        </th>
                                    )
                                }
                            </tr>
                            
                        </thead>
                        <tbody>
                            {/* -------------------------------------------Data-Start------------------------------------------ */}
                            { data_minus_avr.map((xi: Array<number>, i: number) => 
                                <tr key={"observation-"+ i+1}>
                                    
                                    <th scope='row' className='text-center'>{i+1}</th>
                                    { xi.map((xij: number, j: number) => 
                                        <td key={"xij-"+ `${i+1}` + `${j+1}`} className='text-center'>{xij}</td>
                                    )}
                                </tr>
                            )}
                            {/* -------------------------------------------Data-End-------------------------------------------- */}

                            {/* -------------------------------------------Footer-Start------------------------------------------ */}
                            <tr>
                                <th scope='row' className='text-center'>
                                    <MathJax inline={true}>{"\\(\\ Q_j = \\sum y^2_{ij} \\)"}</MathJax>
                                </th>
                                { Qj.map((Qj: number, iter: number) => 
                                        <td key={"Qj-" + iter } scope="col" className='text-center'>{Qj}</td>
                                )}
                                <td className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum Q_{j}= ${sum_Qj}\\)`}</MathJax>
                                </td>
                            </tr>

                            <tr>
                                <th scope='row' className='text-center'>
                                    <MathJax inline={true}>{"\\(\\ T_j = \\sum y_{ij} \\)"}</MathJax>
                                </th>
                                { Tj.map((Tj: number, iter: number) => 
                                        <td key={"Tj-" + iter } className='text-center'>{Tj}</td>
                                )}
                                <td  className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum T_{j}= ${sum_Tj}\\)`}</MathJax>
                                </td>
                            </tr>

                            <tr>
                                <th scope='row' className='text-center'>
                                    <MathJax inline={true}>{"\\(\\ T^2_j \\)"}</MathJax>
                                </th>
                                { Tj2.map((Tj2: number, iter: number) => 
                                        <td key={"Tj2-" + iter } className='text-center'>{Tj2}</td>
                                )}
                                <td className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum T^2_{j}= ${sum_Tj2}\\)`}</MathJax>
                                </td>
                            </tr>
                            {/* -------------------------------------------Footer-End-------------------------------------------- */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className='row justify-content-center'>
            <div className='col text-center'>
                <p className='fw-light'>Таблица 3.</p>
            </div>
        </div>

    </div>
}