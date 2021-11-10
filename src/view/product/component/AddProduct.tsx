import { Button, Form, Input, Select } from 'antd'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '../../../type/state'
import { CategoryState } from '../../category/type'
import {connect, DispatchProp} from "react-redux";
import { Product } from '../type'
import { productActions } from '..'
const Item = Form.Item
const { Option } = Select;
interface StateProps {
  detail: Product
}

interface Props extends StateProps, DispatchProp {}
const AddProducts = ({detail, dispatch}: Props) => {
  const { list : categoryList } = useSelector<RootState, CategoryState>(state => state.app.category)
  const onFinish = (product: Product) => {
    if(detail._id) {
      dispatch(productActions.put(product))
    } else {
      dispatch(productActions.create(product))
    }
  }
  const addProductForm = () => {
    return (
      <Form initialValues={{...detail}} onFinish={onFinish}>
        <Item name="name" label="商品名称">
          <Input></Input>
        </Item>
        <Item name="description" label="商品描述">
          <Input></Input>
        </Item>
        <Item name="price" label="商品价格">
          <Input></Input>
        </Item>
        <Item name="category" label="所属分类">
          <Select>
            <Option value="">请选择分类</Option>
            {
            categoryList.map(item => {
              return <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
            })
          }
          </Select>
        </Item>
        <Item >
          <Button type="primary" htmlType="submit">
            添加商品
          </Button>
        </Item>
      </Form>
    )
  }
  return (
    <Layout title={(detail._id ? "编辑": "添加") + "商品"} subTitle="">
      {addProductForm()}
    </Layout>
  )
}
const mapStateToProps = (state: RootState): StateProps => {
  return {
    detail: state.app.product.detail,
  };
};

export default connect(mapStateToProps)(AddProducts);