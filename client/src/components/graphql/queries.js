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

export const SINGLE_PERSON_WITH_CAR =  gql`
    query PersonWithCars($id: String!) {
        singlePersonWithCars(id: $id) {
            cars {
                price
                model
                make
                id
                personId
                year
            }
            firstName
            id
            lastName
        }
    }
`

export const GET_PERSON_WITH_CAR = gql`
    query { 
        personWithCars {
            firstName
            id
            lastName
            cars {
                id
                make
                model
                personId
                price
                year
            }
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

export const ADD_CAR = gql`
    mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
        addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id,
            year,
            make,
            model,
            price,
            personId
        }
    }
`

export const UPDATE_CAR = gql`
    mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
        updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id,
            year,
            make,
            model,
            price,
            personId
        }
    }
`

export const DELETE_CAR = gql`
    mutation RemoveCar($id: String!) {
        removeCar(id: $id) {
            id
            personId
        }
    }
`