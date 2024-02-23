import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PERSONS, GET_PERSON_WITH_CAR, ADD_CAR } from "./../graphql/queries";
import { DollarOutlined } from "@ant-design/icons";
import _ from "lodash";

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState();
    const { loading, error, data } = useQuery(GET_PERSONS)
    const [addCar] = useMutation(ADD_CAR);

    if (data) {
        console.log(data)
    }
    const style = getStyles();
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {

        const { year, make, model, price, personId } = values;
        addCar({
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
                
                console.log("data here", data);

                
                const localPersonData = JSON.parse(JSON.stringify(data.personWithCars));

                const personWithCarsIndex = localPersonData.findIndex(person => person.id == personId);
    
                const personWithCarToUpdate = localPersonData[personWithCarsIndex];

                let newCar = {id, year, make, model, price, personId};
                
                const updatedCars = personWithCarToUpdate.cars ? [...personWithCarToUpdate.cars, newCar] : [newCar];

                personWithCarToUpdate.cars = updatedCars

                localPersonData[personWithCarsIndex] = personWithCarToUpdate;

                cache.writeQuery({
                    query: GET_PERSON_WITH_CAR,
                    data: {
                        ...data,
                        personWithCars: localPersonData
                    }
                })
            }
        })
        form.resetFields()
    }

    const selectChange = (value) => {
        console.log("val is ", value)
    }

    return (
        <div>
            <div>
                {
                    data && data.persons && data.persons.length > 0 && <>

                        <h1 style={style.title}> Add Car</h1>
                        <Form
                            name='add-car-form'
                            layout='inline'
                            size='large'
                            style={{ marginBottom: '40px' }}
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name='year'
                                label="Year"
                                rules={[{ required: true, message: 'Year is required' }]}
                            >
                                <Input style={style.inputBox} placeholder='Year' />
                            </Form.Item>
                            <Form.Item
                                name='make'
                                label="Make"
                                rules={[{ required: true, message: 'Make is required' }]}
                            >
                                <Input style={style.inputBox} placeholder='Make' />
                            </Form.Item>
                            <Form.Item
                                name='model'
                                label="Model"
                                rules={[{ required: true, message: 'Model is required' }]}
                            >
                                <Input style={style.inputBox} placeholder='Model' />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                label="Price"
                                rules={[{ required: true, message: 'Price is required' }]}
                            >
                                <Input type='number' style={style.inputBox} prefix={<DollarOutlined />} placeholder='Price' />
                            </Form.Item>

                            <Form.Item
                                name='personId'
                                label="Person"
                                rules={[{ required: true, message: 'Person is required' }]}
                            >
                                <Select onChange={selectChange} placeholder="Select a person" style={style.inputBox} >
                                    {
                                        
                                        data.persons.map(( person ) => (
                                            <Select.Option value={person.id}>{person.firstName}</Select.Option>
                                        ))
                                    }
                                    
                                </Select>
                            </Form.Item>


                            <Form.Item shouldUpdate={true}>
                                {() => (
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        disabled={
                                            !form.isFieldsTouched(true) ||
                                            form.getFieldsError().filter(({ errors }) => errors.length).length
                                        }
                                    >
                                        Add Car
                                    </Button>
                                )}
                            </Form.Item>
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
        }
    }
}


export default AddCar;