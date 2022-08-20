import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Task_1_1 } from './tasks/Task_1_1'
import { Task_1_2 } from './tasks/Task_1_2'


export const App = () => {
    return <div>
        <Navbar />
        <div className='m-1'>
            <Routes>
                <Route path='task-1-1' element={<Task_1_1 />} />
                <Route path='task-1-2' element={<Task_1_2 />} />
            </Routes>
        </div>
    </div>
}
