import { DeleteOutlined } from "@ant-design/icons";
import { GET_PERSONS, DELETE_CAR, GET_PERSON_WITH_CAR } from "./../graphql/queries"
import { useMutation } from "@apollo/client";
import _ from  'lodash';

const RemoveCar = ({id, personId}) => {

    const [deleteCar] = useMutation(DELETE_CAR, {
        
        update(cache, {data: { removeCar }}) {
            
            const { personWithCars } = cache.readQuery({ query: GET_PERSON_WITH_CAR });
            let localPersonsData = JSON.parse(JSON.stringify(personWithCars));
            let currentPerson = _.find(localPersonsData, {'id': personId});
            let removedCar = _.remove(currentPerson.cars, function (car) { return car.id === id; })

            cache.writeQuery({
                query: GET_PERSON_WITH_CAR,
                data: {
                    personWithCars: localPersonsData
                }
            })
        }
    });

    const handleButtonCLick= () => {
        let result = window.confirm("Are you sure you want to delete this car ?");
        console.log(id)
        if(result) {
            deleteCar({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined onClick={handleButtonCLick} key="delete" style={{ color: "red" }}/>
}

export default RemoveCar;