import { DeleteOutlined } from "@ant-design/icons";
import { GET_PERSONS, REMOVE_PERSON, GET_PERSON_WITH_CAR } from "./../graphql/queries"
import { useMutation } from "@apollo/client";
import _ from  'lodash';

const RemovePerson = ({id}) => {

    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, {data: { removePerson }}) {
            const { personWithCars } = cache.readQuery({ query: GET_PERSON_WITH_CAR });

            cache.writeQuery({
                query: GET_PERSONS,
                data: {
                    persons: _.filter(personWithCars, person => person.id !== id)
                }
            })

            cache.writeQuery({
                query: GET_PERSON_WITH_CAR,
                data: {
                    personWithCars: _.filter(personWithCars, person => person.id !== id)
                }
            })
        }
    });

    const handleButtonCLick= () => {
        let result = window.confirm("Are you sure you want to delete this person ?");
        console.log(id)
        if(result) {
            removePerson({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined onClick={handleButtonCLick} key="delete" style={{ color: "red" }}/>
}

export default RemovePerson;