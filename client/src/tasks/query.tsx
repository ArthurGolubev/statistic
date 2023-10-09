import {gql} from '@apollo/client'

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