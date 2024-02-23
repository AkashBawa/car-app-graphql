import { Card } from "antd"
import RemoveCar from "../buttons/RemoveCar";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons"
import UpdateCar from "../forms/UpdateCar";

const CarCard = (props) => {

    const [editMode, setUpdateMode] = useState(false)
    const style = getStyles();
    const { id, year, model, make, price, personId, enableEdit } = props;
    
    const handleEdit = () => {
        setUpdateMode(!editMode)
    }


    return (
        <div>

            {
                editMode ? <UpdateCar id={id} year={year} model={model} make={make} price={price} personId={personId} onButtonClick={handleEdit} /> :
                    <Card 
                        type="inner" 
                        title={`${year} ${make} ${model} -> $ ${price}`} style={style.card}
                        actions={
                            enableEdit ? 
                            [
                            <EditOutlined key={"edit"} onClick={handleEdit}/>,
                            <RemoveCar id={id} personId={personId} />
                        ] : []}
                    >
                    </Card>
            }

        </div>
    )
}

const getStyles = () => ({
    card: {
      marginTop: 16
    }
})

export default CarCard;