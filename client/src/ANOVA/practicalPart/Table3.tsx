import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { calculatedANOVA, openCSV } from '../rv'

export const Table3 = () => {
    
    const openCSVSub = useReactiveVar(openCSV)
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)
    console.log("123 ->", calculatedANOVASub)
    
    return <div className='mt-3 mb-4' style={{pageBreakBefore: 'always'}}>
        
        <div className='row justify-content-center'>
            <div className='col'>
                <div className='table-responsive'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center align-middle" scope="col" rowSpan={3}>Номер<br/>наблюдений</th>
                                <th className="text-center" scope="col" colSpan={openCSVSub.factors.length * 2}>{openCSVSub.header1}</th>
                                <th className="text-center align-middle" scope="col" rowSpan={3}>Итоговый<br/>столбец</th>
                            </tr>
                            <tr>
                                { openCSVSub.factors.map((F: string, iter: number) =>
                                    <th key={"factor-"+ iter+1} scope="col" colSpan={2} className='text-center'>{F}</th>
                                )}
                            </tr>
                            <tr>
                                { 
                                    calculatedANOVASub.yHeaders.map((yHeader: any, iter: number) =>
                                        <th key={"factor-"+ iter+1} scope="col" className='text-center'>
                                            <MathJax inline={true}>{`\\(\\ ${yHeader} \\)`}</MathJax>
                                        </th>
                                    )
                                }
                            </tr>
                            
                        </thead>
                        <tbody>
                            {/* -------------------------------------------Data-Start------------------------------------------ */}
                            { calculatedANOVASub.dataMinusAvr.map((xi: Array<number>, i: number) => 
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
                                { calculatedANOVASub.Qj.map((Qj: number, iter: number) => 
                                        <td key={"Qj-" + iter } scope="col" className='text-center'>{Qj}</td>
                                )}
                                <td className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum Q_{j}= ${calculatedANOVASub.sumQj}\\)`}</MathJax>
                                </td>
                            </tr>

                            <tr>
                                <th scope='row' className='text-center'>
                                    <MathJax inline={true}>{"\\(\\ T_j = \\sum y_{ij} \\)"}</MathJax>
                                </th>
                                { calculatedANOVASub.Tj.map((Tj: number, iter: number) => 
                                        <td key={"Tj-" + iter } className='text-center'>{Tj}</td>
                                )}
                                <td  className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum T_{j}= ${calculatedANOVASub.sumTj}\\)`}</MathJax>
                                </td>
                            </tr>

                            <tr>
                                <th scope='row' className='text-center'>
                                    <MathJax inline={true}>{"\\(\\ T^2_j \\)"}</MathJax>
                                </th>
                                { calculatedANOVASub.Tj2.map((Tj2: number, iter: number) => 
                                        <td key={"Tj2-" + iter } className='text-center'>{Tj2}</td>
                                )}
                                <td className='text-center'>
                                    <MathJax inline={true}>{`\\( \\sum T^2_{j}= ${calculatedANOVASub.sumTj2}\\)`}</MathJax>
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