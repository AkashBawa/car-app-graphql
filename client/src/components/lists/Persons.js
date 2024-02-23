import { useQuery } from "@apollo/client";
import { GET_PERSONS, GET_PERSON_WITH_CAR } from "../graphql/queries";
import { List } from "antd";
import PersonCard from "../listItems/PersonCard";
const Persons = () => {
    const style = getStyles();

    // const { loading, error, data } = useQuery(GET_PERSONS);
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CAR);

    if (loading) return "Loading...";
    if (error) return 'Error';
    if (data) {
        console.log(data)
    }

    return (
        <List grid={{ gutter:20, column: 1}} style={style.list}>
            {
                data.personWithCars.map((person, index) => {
                    return (
                        <List.Item key={index}>
                            <PersonCard id={person.id} firstName={person.firstName} lastName={person.lastName} cars={person.cars}/>
                        </List.Item>
                    )
                })
            }
        </List>
    )
}

const  getStyles = () => ({
    list: {
        display:"flex",
        justifyContent:"center"
    },
    personCard: {
        border: "1px solid",
        padding: "15px"
    }
})

export default Persons;