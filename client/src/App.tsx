import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useInterface } from './interfaceStore'
import { ANOVA } from './ANOVA/ANOVA'
import { Navbar } from './Navbar'
import { Task_1_1 } from './tasks/Task_1_1'
import { Task_1_2 } from './tasks/Task_1_2'


export const App = () => {
    const print = useInterface(state => state.print)

    return <div>
        {!print.view && <Navbar />}
        <div className='m-3' style={{fontFamily: print.font}}>
            <Routes>
                <Route path='task-1-1' element={<Task_1_1 />} />
                <Route path='task-1-2' element={<Task_1_2 />} />
                <Route path='ANOVA' element={<ANOVA />} />
            </Routes>
        </div>
    </div>
}
