import * as React from 'react'
import { MathJax } from 'better-react-mathjax'


export const Table1 = () => {
    
    return <div className='mt-3'>

        <div className='row justify-content-center'>
            <div className='col'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center align-middle" scope="col">Номер<br/>испытания</th>
                            <th className="text-center" scope="col" colSpan={4}>Уровни фактора</th>
                        </tr>
                        <tr>
                            <th className="text-center align-middle" scope="col"><MathJax inline={true}>{"\\(\\ i \\) "}</MathJax></th>
                            <th className="text-center" scope="col"><MathJax inline={true}>{"\\(\\ F_1 \\) "}</MathJax></th>
                            <th className="text-center" scope="col"><MathJax inline={true}>{"\\(\\ F_2 \\) "}</MathJax></th>
                            <th className="text-center" scope="col"><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></th>
                            <th className="text-center" scope="col"><MathJax inline={true}>{"\\(\\ F_p \\) "}</MathJax></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='col' className='text-center'>1</th>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{11} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{12} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{1p} \\) "}</MathJax></td>
                        </tr>
                        <tr>
                            <th scope='col' className='text-center'>2</th>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{21} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{22} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{2p} \\) "}</MathJax></td>
                        </tr>
                        <tr>
                            <th scope='col' className='text-center'>...</th>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                        </tr>
                        <tr>
                            <th scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ q \\) "}</MathJax></th>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{q1} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{q2} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ x_{qp} \\) "}</MathJax></td>
                        </tr>
                        <tr>
                            <th scope='col' className='text-center'>
                                Групповая средная
                                <MathJax inline={true}>{"\\(\\ \\bar{x}_{гр} \\) "}</MathJax></th>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ \\bar{x}_{\\text{гр1}} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ \\bar{x}_{\\text{гр2}} \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ ... \\) "}</MathJax></td>
                            <td scope='col' className='text-center'><MathJax inline={true}>{"\\(\\ \\bar{x}_{\\text{гр}p} \\) "}</MathJax></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className='row justify-content-center'>
            <div className='col text-center'>
                <p className='fw-light'>Таблица 1.</p>
            </div>
        </div>

</div>
}