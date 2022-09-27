import { gql } from "@apollo/client";

export const UPLOAD_DATA = gql`
    query upload_data_query($data: String!){
        uploadData(data: $data){
            data
        }
    }
`