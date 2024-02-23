import "./../../App.css";
import PersonCard from "../listItems/PersonCard";

import { SINGLE_PERSON_WITH_CAR } from "./../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons"

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const SingleView = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {loading, error, data} = useQuery(SINGLE_PERSON_WITH_CAR, {
        variables: {
            id: params.id
        }
    });

    if(error) console.log(error)
    if(data) {
        console.log(data)
    }

    const goBack = () => {
        navigate("/")
    }
   
    return (
        <div className="App">
            <div style={{width: "100%"}}>
                <ArrowLeftOutlined onClick={goBack}/>
            </div>
            <h1>Person Details</h1>
            {
                data && <PersonCard enableEdit={false} firstName={data.singlePersonWithCars.firstName} id={data.singlePersonWithCars.id} lastName={data.singlePersonWithCars.lastName} cars={data.singlePersonWithCars.cars} />
            }
        </div>
    )
}

export default SingleView;