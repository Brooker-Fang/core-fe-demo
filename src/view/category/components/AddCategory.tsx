import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { categoryActions } from '..'
import Layout from '../../components/Layout'
import { DispatchProp, useDispatch} from "react-redux";
interface Props extends DispatchProp{
  id?: string
  name?: string
}
const Item = Form.Item
const AddCategory = ({id, name}:Props) => {
  const dispatch = useDispatch()
  const [_name] = useState<string>(name || '')
  const onFinish = (val: { name: string}) => {
    const { name } = val
    debugger
    name && dispatch(categoryActions.created(name));
  }
  return (
    <Layout title="添加分类" subTitle="">
      <Form onFinish={onFinish}>
        <Item name="name" label="分类名称">
          <Input value={_name}></Input>
        </Item>
        <Item >
          <Button type="primary" htmlType="submit">
            添加分类
          </Button>
        </Item>
      </Form>
    </Layout>
  )
}
export default AddCategory