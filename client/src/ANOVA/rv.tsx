import { makeVar } from "@apollo/client";

export const openCSV = makeVar({
    description: '' as string,
    header: '' as string,
    factors: [] as Array<string>,
    data: [] as Array<Array<number>>,
    groupAverages: [] as Array<number>,
})

export const calculatedANOVA = makeVar({
    yHeaders: [] as Array<string>,
    dataMinusAvrAndSquare: [] as Array<Array<number>>,
    squareData: [] as Array<Array<number>>,
    overallAverage: 0 as number,
    Qj: [] as Array<number>,
    Tj: [] as Array<number>,
    Tj2: [] as Array<number>,
})

