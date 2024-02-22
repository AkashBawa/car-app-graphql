import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON } from '../graphql/queries'

const UpdatePerson = props => {
    const { id, firstName, lastName } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [updatePerson] = useMutation(UPDATE_PERSON)

    const onFinish = values => {
        console.log("submit")
        const {firstName, lastName} = values;

        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        })
        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
    }, [])

    return (
        <Form
            name='update-contact-form'
            layout='inline'
            form={form}
            initialValues={{
                firstName,
                lastName
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please enter a first name' }]}
            >
                <Input placeholder='i.e. John' />
            </Form.Item>
            <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
                <Input placeholder='i.e. Smith' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Contact
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson