import { useReactiveVar } from '@apollo/client'
import { MathJax } from 'better-react-mathjax'
import * as React from 'react'
import { calculatedANOVA, openCSV } from '../rv'

export const Table3 = () => {
    
    const openCSVSub = useReactiveVar(openCSV)
    const calculatedANOVASub = useReactiveVar(calculatedANOVA)
    console.log("123 ->", calculatedANOVASub)
    
    return <div className='mt-3 mb-4'>
        
        <div className='row justify-content-center'>
            <div className='col'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="text-center align-middle" scope="col" rowSpan={3}>Номер<br/>наблюдений</th>
                        <th className="text-center" scope="col" colSpan={openCSVSub.factors.length * 2}>{openCSVSub.header}</th>
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
                    { calculatedANOVASub.dataMinusAvrAndSquare.map((xi: Array<number>, i: number) => 
                        <tr key={"observation-"+ i+1}>
                            
                            <th scope='col' className='text-center'>{i+1}</th>
                            { xi.map((xij: number, j: number) => 
                                <td key={"xij-"+ `${i+1}` + `${j+1}`} scope="col" className='text-center'>{xij}</td>
                            )}
                        </tr>
                    )}
                    {/* -------------------------------------------Data-End-------------------------------------------- */}

                    {/* -------------------------------------------Footer-Start------------------------------------------ */}
                    <tr className='border-top border-3'>
                        <th scope='col' className='text-center'>
                            <MathJax inline={true}>{"\\(\\ Q_j = \\sum y^2_{ij} \\)"}</MathJax>
                        </th>
                        { calculatedANOVASub.Qj.map((Qj: number, iter: number) => 
                                <td key={"Qj-" + iter } scope="col" className='text-center'>{Qj}</td>
                        )}
                    </tr>
                    <tr>
                        <th scope='col' className='text-center'>
                            <MathJax inline={true}>{"\\(\\ T_j = \\sum y_{ij} \\)"}</MathJax>
                        </th>
                        { calculatedANOVASub.Tj.map((Tj: number, iter: number) => 
                                <td key={"Tj-" + iter } scope="col" className='text-center'>{Tj}</td>
                        )}
                    </tr>
                    <tr>
                        <th scope='col' className='text-center'>
                            <MathJax inline={true}>{"\\(\\ T^2_j \\)"}</MathJax>
                        </th>
                        { calculatedANOVASub.Tj2.map((Tj2: number, iter: number) => 
                                <td key={"Tj2-" + iter } scope="col" className='text-center'>{Tj2}</td>
                        )}
                    </tr>
                    {/* -------------------------------------------Footer-End-------------------------------------------- */}
                </tbody>
            </table>
            </div>
        </div>

        <div className='row justify-content-center'>
            <div className='col text-center'>
                <p className='fw-light'>Таблица 3.</p>
            </div>
        </div>

    </div>
}