import { gql } from "@apollo/client";
    export const OPEN_CSV = gql`
        query openCSV_query($data: String!){
            openCsv(data: $data){
                description
                header
                factors
                data
                groupAverages
            }
        }
    `

export const CALCULATE_ANOVA = gql`
    query calculateANOVA_query($data: String, $precision: Int, $averages: [number]){
        calculateAnova(data: $data, precision: $precision, averages: $averages){
            yHeaders
            dataMinusAvrAndSquare
            overallAverage
            Qj
            Tj
            Tj2
        }
    }
`
