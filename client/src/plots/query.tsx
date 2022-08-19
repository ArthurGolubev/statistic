import { gql } from "@apollo/client";


export const GET_UNIFORM_DISTRIBUTION = gql`
    query get_uniform_distribution_query($n: Int!){
        uniformDistribution(n: $n){
            x
            y
        }
    }
`

export const GET_NORMAL_DISTRIBUTION = gql`
    query get_normal_distribution_query($n: Int!){
        normalDistribution(n: $n){
            x
            y
        }
    }
`
