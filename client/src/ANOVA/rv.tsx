import { makeVar } from "@apollo/client";

export const data1 = makeVar({
    data: [] as Array<Array<number>>,
    dataMinusAvr: [] as Array<Array<number>>,
    squareData: [] as Array<Array<number>>,
    groupAverages: [] as Array<number>,
    overallAverage: 0 as number,
    Qj: [] as Array<number>,
    Tj: [] as Array<number>,
    Tj2: [] as Array<number>,
})
