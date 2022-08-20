import * as React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return <nav className='navbar navbar-expand-sm bg-light'>
        <div className='container-fluid'>
            <ul className='navbar-nav me-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/task-1-1"><b>Задание 1.1</b></Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/task-1-2"><b>Задание 1.2</b></Link>
                </li>
            </ul>
        </div>
        Nothnig
    </nav>
}