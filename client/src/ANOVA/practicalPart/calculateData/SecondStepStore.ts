import { create } from "zustand"
import { devtools } from "zustand/middleware"


interface secondStepStoreType {
    y_headers: Array<string>,
    to_integer: boolean,
    y11: number,
    y21: number,
    data_minus_avr: Array<Array<number>>,
    square_data: Array<Array<number>>,
    overall_average: number,
    Qj: Array<number>,
    Tj: Array<number>,
    Tj2: Array<number>,
    sum_Qj: number,
    sum_Tj: number,
    sum_Tj2: number,
    equivalence_levels_F: boolean,
    s_total: number,
    n: number,
    s_fact: number,
    column_n: Array<number>,
    s_remainder: number,
    s2_fact: number,
    s2_remainder: number,
    f_observation: number,
    f_crit: number,
    h0: boolean,
    // ---------------
    setState: (response: any) => void
}


export const useSecondStep = create<secondStepStoreType>()(
    devtools(
        set => ({
            y_headers: [],
            to_integer: false,
            y11: 0,
            y21: 0,
            data_minus_avr: [],
            square_data: [],
            overall_average: 0,
            Qj: [],
            Tj: [],
            Tj2: [],
            sum_Qj: 0,
            sum_Tj: 0,
            sum_Tj2: 0,
            equivalence_levels_F: false,
            s_total: 0,
            n: 0,
            s_fact: 0,
            column_n: [],
            s_remainder: 0,
            s2_fact: 0,
            s2_remainder: 0,
            f_observation: 0,
            f_crit: 0,
            h0: false,
            // ------------
            setState: (response) => set(state => ({...response}))
        })
    )
)