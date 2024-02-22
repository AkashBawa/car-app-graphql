import { DeleteOutlined } from "@ant-design/icons";
import { GET_PERSONS, REMOVE_PERSON } from "./../graphql/queries"
import { useMutation } from "@apollo/client";
import _ from  'lodash';

const RemovePerson = ({id}) => {

    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, {data: { removePerson }}) {
            const {persons } = cache.readQuery({ query: GET_PERSONS });

            cache.writeQuery({
                query: GET_PERSONS,
                data: {
                    persons: _.filter(persons, person => person.id !== id)
                }
            })
        }
    });

    const handleButtonCLick= () => {
        let result = window.confirm("Are you sure you want to delete this ?");
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