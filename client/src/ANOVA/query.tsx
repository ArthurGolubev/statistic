import { gql } from "@apollo/client";
    export const OPEN_CSV = gql`
        query openCSV_query($data: String!){
            openCsv(data: $data){
                description
                header1
                header2
                factors
                data
                groupAverages
                errorMax
                errorMin
                dotsX
                dotsY
            }
        }
    `

export const CALCULATE_ANOVA = gql`
    query calculateANOVA_query($data: String!, $precision: Int!, $alpha: Float!, $averages: [Float!]!){
        calculateAnova(data: $data, precision: $precision, alpha: $alpha averages: $averages){
            yHeaders
            toInteger
            y11
            y21
            dataMinusAvr
            overallAverage
            Qj
            Tj
            Tj2
            sumQj
            sumTj
            sumTj2
            equivalenceLevelsF
            sTotal
            n
            sFact
            columnN
            sRemainder
            s2Fact
            s2Remainder
            fObservation
            fCrit
            h0
        }
    }
`
