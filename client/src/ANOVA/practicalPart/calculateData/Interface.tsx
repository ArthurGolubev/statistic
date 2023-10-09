import * as React from 'react'
import { SetDataDescription } from '../stepOne/SetDataDescription'
import { useInterface } from '../../../interfaceStore'
import { Route, Router } from 'react-router-dom'


export const Interface = () => {
    const setShowTheoreticalPart = useInterface(state => state.setShowTheoreticalPart)

    return <div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={ e=>setShowTheoreticalPart(e.target.checked) }/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Показывать теоретическую часть
            </label>
        </div>
        <div>
            <div className='border border-top-0 mt-1'>
                <SetDataDescription />
            </div>
        </div>
    </div>
}