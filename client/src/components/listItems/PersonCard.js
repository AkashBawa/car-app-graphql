import { Card } from "antd"
import RemovePerson from "./../buttons/RemovePerson"
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons"

const PersonCard = (props) => {

    const [editMode, setUpdateMode] = useState(false)
    const style = getStyles();
    const { id, firstName, lastName } = props;
    
    const handleEdit = () => {
        setUpdateMode(!editMode)
    }

    return (
        <div>
            {
                editMode ? <UpdatePerson id={id} firstName={firstName} lastName={lastName} onButtonClick={handleEdit} /> : 
                    <Card style={style.card}
                        actions={[
                            <EditOutlined key={"edit"} onClick={handleEdit}/>,
                            <RemovePerson id={id} />
                        ]}
                    >
                        {firstName} {lastName}
                    </Card>

            }

        </div>
    )
}

const getStyles = () => ({
    card: {
        width: "500px"
    }
})

export default PersonCard