import {gql} from '@apollo/client'

export const GET_UNIFORM_DISTRIBUTION = gql`
    query get_uniform_distribution_query($sampleSize: Int!){
        uniformDistributionStatistic(sampleSize: $sampleSize){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`
export const GET_NORMAL_DISTRIBUTION = gql`
    query get_normal_distribution_query($sampleSize: Int!){
        normalDistributionStatistic(sampleSize: $sampleSize){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`
export const GET_EXPONENTIAL_DISTRIBUTION = gql`
    query get_exponential_distribution_query($sampleSize: Int!){
        exponentialDistributionStatistic(sampleSize: $sampleSize){
            array
            variance
            mean
            standardDeviation
            cdf
        }
    }
`

export const EVALUATE_EQUALITY_CDF = gql`
    query evaluate_equality_cdf_query($n: Int!, $m: Int!, $nDistribution: String!, $mDistribution: String!, $a: Int!){
        evaluateEqualityCdf(n: $n, m: $m, nDistribution: $nDistribution, mDistribution: $mDistribution, a: $a){
            cdf1
            cdf2
            array1
            array2
        }
    }
`