import { Card } from "antd"
import RemovePerson from "./../buttons/RemovePerson"
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons"
import Cars from "./../lists/Cars";
import { Link } from 'react-router-dom';

const PersonCard = (props) => {

    const [editMode, setUpdateMode] = useState(false)
    const style = getStyles();
    const { id, firstName, lastName, cars, enableEdit = true } = props;

    const handleEdit = () => {
        setUpdateMode(!editMode)
    }

    return (
        <div>

            <Card style={style.card}
                actions={ enableEdit ?  [
                    <EditOutlined key={"edit"} onClick={handleEdit} />,
                    <RemovePerson id={id} />
                ] : [] }
            >
                {
                    editMode ? <UpdatePerson id={id} firstName={firstName} lastName={lastName} onButtonClick={handleEdit} /> : <>
                         {firstName} {lastName}
                    </>
                }
               

                <Cars cars={cars} enableEdit={enableEdit} />
                {
                    enableEdit && <Link to={`/people/${id}`}>Learn more</Link>
                }
                
            </Card>


        </div>
    )
}

const getStyles = () => ({
    card: {
        width: "1000px"
    }
})

export default PersonCard