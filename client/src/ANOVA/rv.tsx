import { makeVar } from "@apollo/client";

export const openCSV = makeVar({
    description: '' as string,
    header1: '' as string,
    header2: '' as string,
    factors: [] as Array<string>,
    data: [] as Array<Array<number>>,
    groupAverages: [] as Array<number>,
    errorMax: [],
    errorMin: [],
    dotsX: [],
    dotsY: []
})

export const calculatedANOVA = makeVar({
    yHeaders: [] as Array<string>,
    toInteger: false,
    y11: 0,
    y21: 0,
    dataMinusAvr: [] as Array<Array<number>>,
    squareData: [] as Array<Array<number>>,
    overallAverage: 0 as number,
    Qj: [] as Array<number>,
    Tj: [] as Array<number>,
    Tj2: [] as Array<number>,
    sumQj: 0,
    sumTj: 0,
    sumTj2: 0,
    equivalenceLevelsF: false as boolean,
    sTotal: 0,
    n: 0,
    sFact: 0,
    columnN: [] as Array<number>,
    sRemainder: 0,
    s2Fact: 0,
    s2Remainder: 0,
    fObservation: 0,
    fCrit: 0,
    h0: false as boolean,
    
})

