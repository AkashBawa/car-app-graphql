import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS, GET_PERSON_WITH_CAR } from "./../graphql/queries";

const AddPerson = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [addPerson] = useMutation(ADD_PERSON)

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        let id = uuidv4();
        const { firstName, lastName } = values;
        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({query: GET_PERSON_WITH_CAR})

                cache.writeQuery({
                    query: GET_PERSON_WITH_CAR,
                    data: {
                        ...data,
                        personWithCars: [...data.personWithCars, addPerson]
                    }
                })

                const personData =  cache.readQuery({query: GET_PERSONS});
                cache.writeQuery({
                    query: GET_PERSONS,
                    data: {
                        ...personData,
                        persons: [...personData.persons, addPerson]
                    }
                })
            }
        });

        form.resetFields();
    }

    return (
        <div>
            <Form
                name='add-contact-form'
                layout='inline'
                size='large'
                style={{ marginBottom: '40px' }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name='firstName'
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter a first name' }]}
                >
                    <Input placeholder='First Name' />
                </Form.Item>
                <Form.Item 
                name='lastName' 
                label="Last Name"
                rules={[{ required: true, message: 'Please enter a last name' }]}>
                    <Input placeholder='Last Name' />
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
                            Add Contact
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    
    )
    
}


export default AddPerson