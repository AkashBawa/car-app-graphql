import { useQuery } from "@apollo/client";
import { GET_PERSONS } from "../graphql/queries";
import { List } from "antd";
import PersonCard from "../listItems/PersonCard";
const Persons = () => {
    const style = getStyles();

    const { loading, error, data } = useQuery(GET_PERSONS);

    if (loading) return "Loading...";
    if (error) return 'Error';
    if (data) {
        console.log(data)
    }

    return (
        <List grid={{ gutter:20, column: 1}} style={style.list}>
            {
                data.persons.map((person, index) => {
                    return (
                        <List.Item key={index}>
                            <PersonCard id={person.id} firstName={person.firstName} lastName={person.lastName}/>
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
    }
})

export default Persons;