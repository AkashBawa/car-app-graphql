import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PERSONS, GET_PERSON_WITH_CAR, UPDATE_CAR } from "./../graphql/queries";
import { DollarOutlined } from "@ant-design/icons";
import _ from "lodash";

const UpdateCar = (props) => {
    const {id, year, make,model, price, personId} = props;

    const [form] = Form.useForm()
    const [, forceUpdate] = useState();
    const { loading, error, data } = useQuery(GET_PERSONS);
    const [updateCar] = useMutation(UPDATE_CAR);

    if (data) {
        console.log(data)
    }
    const style = getStyles();
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {

        let confirm = window.confirm("Do you want to update the fields");
        if(confirm) {
            const { year, make, model, price, personId } = values;
            updateCar({
                variables: {
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                },
                update: (cache, { data: { addPerson } }) => {
    
                    const data = cache.readQuery({ query: GET_PERSON_WITH_CAR })
                    
                
    
                    
                    const localPersonData = JSON.parse(JSON.stringify(data.personWithCars));
    
                    const personWithCarsIndex = localPersonData.findIndex(person => person.id == personId);
        
                    const personWithCarToAdd = localPersonData[personWithCarsIndex];
    
                    let newCar = {id, year, make, model, price, personId};
                    
                    const updatedCars = personWithCarToAdd.cars ? [...personWithCarToAdd.cars, newCar] : [newCar];
    
                    personWithCarToAdd.cars = updatedCars
    
                    localPersonData[personWithCarsIndex] = personWithCarToAdd;
                    
                    // person with car to remove;
                    if (props.personId != personId) {
                        const personWithRemoveCarIndex = localPersonData.findIndex(person => person.id == props.personId);
                        const personWithRemoveCar = localPersonData[personWithRemoveCarIndex];
                        let newCarList = _.remove(personWithRemoveCar.cars, {id : id });
                        // personWithRemoveCar.cars = newCarList;
                        // localPersonData[personWithCarsIndex] = personWithRemoveCar;
                    }
                    // console.log("final data after update  ==  ", localPersonData);
                    cache.writeQuery({
                        query: GET_PERSON_WITH_CAR,
                        data: {
                            ...data,
                            personWithCars: localPersonData
                        }
                    })
                }
            })
            form.resetFields();
            props.onButtonClick();
        }

    }

    const selectChange = (value) => {
        console.log("val is ", value)
    }

    return (
        <div>
            <div>
                {
                    data && data.persons && data.persons.length > 0 && <>

                        <h1 style={style.title}> Update Car</h1>
                        <Form
                            name='update-car-form'
                            layout='inline'
                            size='large'
                            style={{ marginBottom: '40px', justifyContent: "center" }}
                            form={form}
                            onFinish={onFinish}
                            initialValues={{
                                year,
                                make,
                                model,
                                price,
                                personId
                            }}
                        >
                            <Form.Item
                                name='year'
                                label="Year"
                                rules={[{ required: true, message: 'Year is required' }]}
                            >
                                <Input value={year} defaultValue={year} style={style.inputBox} placeholder='Year' />
                            </Form.Item>
                            <Form.Item
                                name='make'
                                label="Make"
                                rules={[{ required: true, message: 'Make is required' }]}
                            >
                                <Input value={make} defaultValue={make} style={style.inputBox} placeholder='Make' />
                            </Form.Item>
                            <Form.Item
                                name='model'
                                label="Model"
                                rules={[{ required: true, message: 'Model is required' }]}
                            >
                                <Input  defaultValue={model} style={style.inputBox} placeholder='Model' />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                label="Price"
                                rules={[{ required: true, message: 'Price is required' }]}
                            >
                                <Input defaultValue={price} type='number' style={style.inputBox} prefix={<DollarOutlined />} placeholder='Price' />
                            </Form.Item>

                            <Form.Item
                                name='personId'
                                label="Person"
                                rules={[{ required: true, message: 'Person is required' }]}
                            >
                                <Select defaultValue={personId} onChange={selectChange} placeholder="Select a person" style={style.inputBox} >
                                    {
                                        
                                        data.persons.map(( person ) => (
                                            <Select.Option value={person.id}>{person.firstName}</Select.Option>
                                        ))
                                    }
                                    
                                </Select>
                            </Form.Item>

                            
                            <div style={style.buttonBox}> 
                                <Form.Item shouldUpdate={true}>
                                    {() => (
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            disabled={
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Update Car
                                        </Button>
                                    )}
                                </Form.Item>
                                <Button onClick={props.onButtonClick}>Cancel</Button>
                            </div>
                        </Form>
                    </>
                }
            </div>
        </div>
    )

}

const getStyles = () => {
    return {
        title: {
            fontSize: 20,
            padding: "15px",
            textAlign: "center"
        },
        inputBox: {
            width: "100px"
        },
        buttonBox: {
            display: "flex",
            margin: "1rem"
        }
    }
}


export default UpdateCar;