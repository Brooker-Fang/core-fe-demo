import { Button, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { categoryActions } from '..'
import Layout from '../../components/Layout'
import { DispatchProp} from "react-redux";
interface Props extends DispatchProp{
  id?: string
  name?: string
}
const Item = Form.Item
const AddCategory = ({id, name, dispatch}:Props) => {
  const [_id, setId] = useState<string>(id || '')
  const [_name, setName] = useState<string>(name || '')
  const onFinish = (val: { name: string}) => {
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