import { makeVar, useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ANOVA } from './ANOVA/ANOVA'
import { global } from './cache'
import { Navbar } from './Navbar'
import { Task_1_1 } from './tasks/Task_1_1'
import { Task_1_2 } from './tasks/Task_1_2'


export const App = () => {
    const globalSub = useReactiveVar(global)

    return <div>
        {!globalSub.print && <Navbar />}
        <div className='m-3' style={{fontFamily: globalSub.font}}>
            <Routes>
                <Route path='task-1-1' element={<Task_1_1 />} />
                <Route path='task-1-2' element={<Task_1_2 />} />
                <Route path='ANOVA' element={<ANOVA />} />
            </Routes>
        </div>
    </div>
}
