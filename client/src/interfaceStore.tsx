import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface InterfaceType {
    print: { view: boolean, font: string}
    openTable: boolean,
    showTheoreticalPart: boolean
    // -------------------------
    setPrintView: () => void
    setOpenTable: (status: boolean) => void
    setShowTheoreticalPart: (status: boolean) => void
}


export const useInterface = create<InterfaceType>()(
    devtools(
        set => ({
            print: { view: false, font: ''},
            openTable: false,
            showTheoreticalPart: false,
            // ----------------------
            setPrintView: () => set(state => ({...state, print: {view: true, font: "Times New Roman"}})),
            setShowTheoreticalPart: (status) => set(state => ({...state, showTheoreticalPart: status})),
            setOpenTable: (status) => set(state => ({...state, openTable: status}))
        })
    )
)
