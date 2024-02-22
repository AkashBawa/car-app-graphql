import { Card } from "antd"
import RemovePerson from "./../buttons/RemovePerson"
const PersonCard = (props) => {

    const style = getStyles();
    const {id, firstName, lastName } = props;
    console.log(id)
    return (
        <div>
            <Card style={style.card}
                actions={[
                    <RemovePerson id={id}/>
                ]}
            >
                {firstName} {lastName}
            </Card>
        </div>
    )
}

const  getStyles = () => ({
    card : {
        width: "500px"
    }
})

export default PersonCard