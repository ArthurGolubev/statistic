import {gql} from '@apollo/client'

export const GET_UNIFORM_DISTRIBUTION = gql`
    query get_uniform_distribution_query($n: Int!){
        uniformDistributionStatistic(n: $n){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`
export const GET_NORMAL_DISTRIBUTION = gql`
    query get_normal_distribution_query($n: Int!){
        normalDistributionStatistic(n: $n){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`
export const GET_EXPONENTIAL_DISTRIBUTION = gql`
    query get_exponential_distribution_query($n: Int!){
        exponentialDistributionStatistic(n: $n){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`