import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { global } from '../../../cache'
import { OpenData } from './OpenData'
import { CreateData } from './CreateData'


export const Interface = () => {
    const globalSub = useReactiveVar(global)

    return <div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={e=>global({...globalSub, teoreticalpart: e.target.checked})}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Показывать теоретическую часть
            </label>
        </div>
        <div>
            <div>
                <ul className="nav nav-tabs">
                    <li className='nav-item'>
                        <button onClick={()=>global({...globalSub, Interface: 'open'})}
                        className={globalSub.Interface == 'open' ? 'nav-link active' : 'nav-link'} type='button'>Открыть CSV</button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>global({...globalSub, Interface: 'create'})}
                        className={globalSub.Interface == 'create' ? 'nav-link active' : 'nav-link'} type='button'>Создать CSV</button>
                    </li>
                </ul>
            </div>
            <div className='border border-top-0'>
                { globalSub.Interface === 'open' ? <OpenData /> : <CreateData /> }
            </div>
        </div>
    </div>
}