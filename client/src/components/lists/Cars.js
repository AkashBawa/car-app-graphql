import { useQuery } from "@apollo/client";
import { GET_PERSONS, GET_PERSON_WITH_CAR } from "../graphql/queries";
import { List } from "antd";
import CarCard from "../listItems/CarCard";
const Cars = ({cars, enableEdit}) => {

    const style = getStyles();

    return (
        <List grid={{ gutter:20, column: 1}} style={style.list}>
            {
                cars.map((car, index) => {
                    return (
                        <List.Item key={index}>
                            <CarCard id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personId={car.personId} enableEdit={enableEdit} />
                        </List.Item>
                    )
                })
            }
        </List>
    )
}

const  getStyles = () => ({
    list: {
        justifyContent:"center"
    }
})

export default Cars;