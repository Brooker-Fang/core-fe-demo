
import { Button, Form, Input } from 'antd'
import Layout from './Layout'
import { useDispatch } from 'react-redux'
import { useForm } from 'antd/lib/form/Form'
import { UserRequest } from '../../type/api'
import { userActions } from '../user'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
const Item = Form.Item
const Login= () => {
  const dispatch = useDispatch()
  const onFinish = (value: UserRequest) => {
    const { name, password } = value
    dispatch(userActions.login(name, password))
  }
  useDocumentTitle('登录页面')
  const [form] = useForm()
  const signinForm = () => {
    return (
      <Form form={form} onFinish={onFinish}>
        <Item name="name" label="昵稱">
          <Input></Input>
        </Item>
        <Item name="password" label="密码">
          <Input></Input>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Item>
      </Form>
    )
  }
  return (
    <Layout title="登录" subTitle="登录你的账号吧">
      {signinForm()}
    </Layout>
  )
}

export default Login
