import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface FirstStapeDataResponse {
    group_averages: Array<number>,
    error_max: Array<number>,
    error_min: Array<number>,
    dots_x: Array<string>,
    dots_y: Array<number>
    
}

interface FirstStapData extends FirstStapeDataResponse {
    setFirstStepData: (data: FirstStapeDataResponse) => void
}
export const useFirstStepData = create<FirstStapData>()(
    devtools(
        set => ({
            group_averages: [] as Array<number>,
            error_max: [],
            error_min: [],
            dots_x: [],
            dots_y: [],
            // ----------------------
            setFirstStepData: (data) => set(state => ({...state, ...data}))
        })
    )
)