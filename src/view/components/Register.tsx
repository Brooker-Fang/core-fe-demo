import {Button, Form, Input, Result} from 'antd'
import { useEffect, useState } from 'react'
import Layout from './Layout'
import { useDispatch , useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../type/state'
import { UserState } from '../user/type'
import { userActions } from '../user'
import { UserRequest } from '../../type/api'


const Item = Form.Item
const Register = () => {
  const dispatch = useDispatch()
  const [registed, setRegisted] = useState(false)
  // 获取注册结果
  const auth = useSelector<RootState, UserState>(state => state.app.user)
  const currentUser = auth.currentUser
  const onFinish = (value: UserRequest) => {
    const { name, password } = value
    setRegisted(true)
    dispatch(userActions.register(name, password))
  }
  const [ form ] = Form.useForm()
  useEffect(() => {
    // 清空表单
    if(currentUser) {
      form.resetFields()
    }
  }, [currentUser, form])
  const showSuccess = () => {
    if(registed) {
      return <Result
      key="success"
      status="success"
      title="注册成功！"
      extra={[
        <Button type="primary" >
          <Link to="/login">登录</Link>
        </Button>,
      ]}
    />
    }
  }
  const signupForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Item name="name" label="昵稱">
        <Input></Input>
      </Item>
      <Item name="password" label="密码">
        <Input></Input>
      </Item>
      <Item >
        <Button type="primary" htmlType="submit">注册</Button>
      </Item>
    </Form>
  )
  return (
    <Layout  title="注册" subTitle="注册你的账号吧">
      {showSuccess()}
      {signupForm()}
    </Layout>
  )
}

export default Register
