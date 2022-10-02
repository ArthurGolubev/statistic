import * as React from 'react'
import { Link } from 'react-router-dom'
import { global } from './cache'

export const Navbar = () => {
    return <nav className='navbar navbar-expand-sm bg-light'>
        <div className='container-fluid'>
            <ul className='navbar-nav me-auto'>
                <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle' data-bs-toggle="dropdown" type='button' href='#'>ФРВ</a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className='dropdown-item' to="/task-1-1">Задание 1.1</Link>
                        </li>
                        <li>
                            <Link className='dropdown-item' to="/task-1-2">Задание 1.2</Link>
                        </li>
                    </ul>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/ANOVA">ВОДА</Link>
                </li>
            </ul>
        </div>
        <button onClick={()=>global({...global(), print: true, font: "Times New Roman" })} className='btn btn-sm btn-light' type='button'>Печать</button>
    </nav>
}