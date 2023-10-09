import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface DataDescriptionType {
    showTableLayout: boolean,
    data: {},
    headerX: string,
    headerY: string,
    description: string,
    factors: object,
    rows: number,
    cols: number,
    precision: number
    alpha: number
}

interface DataDescriptionStore extends DataDescriptionType {
    setHeaderX: (header: string) => void
    setHeaderY: (header: string) => void
    setRows: (n: number) => void
    setCols: (n: number) => void
    setFactors: (factors: object) => void
    setDescription: (description: string) => void
    setData: (data: object) => void
    setPercision: (n: number) => void
    setAlpha: (n: number) => void
    // setShow
}

export const useDataDescription = create<DataDescriptionStore>()(
    devtools(
        set => ({
            showTableLayout: false,
            data: {} as any,
            headerX: '',
            headerY: '',
            description: '',
            factors: {},
            rows: undefined,
            cols: undefined,
            precision: undefined,
            alpha: undefined,

            // ------------------
            setPercision: (n) => set(state => ({...state, precision: n})),
            setAlpha: (n) => set(state => ({...state, alpha: n})),
            setHeaderX: (header) => set(state => ({...state, headerX: header})),
            setHeaderY: (header) => set(state => ({...state, headerY: header})),
            setRows: (n: number) => set(state => ({...state, rows: n})),
            setCols: (n: number) => set(state => ({...state, cols: n})),
            setDescription: (description) => set(state => ({...state, description: description})),
            setFactors: (factors) => set(state => ({...state, factors: factors})),
            setData: (data) => set(state => ({...state, data: data, showTableLayout: !state.showTableLayout})),
        })
    )
)
