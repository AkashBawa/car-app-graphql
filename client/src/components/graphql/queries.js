import { gql } from "@apollo/client";

export const GET_PERSONS = gql`
    query {
        persons {
            id
            firstName
            lastName
        }
    }
`

export const ADD_PERSON = gql`
    mutation Addperson($id: String!, $firstName: String!, $lastName: String!) {
        addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id,
            firstName
            lastName
        }
    }
`

export const REMOVE_PERSON = gql`
    mutation RemovePerson($id: String!) {
        removePerson(id: $id){
            id,
            firstName,
            lastName
        }
    }
`

export const UPDATE_PERSON = gql`
    mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id,
            firstName,
            lastName
        }
    }
`