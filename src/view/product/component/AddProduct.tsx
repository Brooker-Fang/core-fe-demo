import { Button, Form, Input, Select } from 'antd'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '../../../type/state'
import { CategoryState } from '../../category/type'
import {connect, DispatchProp} from "react-redux";
import { Product } from '../type'
import { productActions } from '..'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import  fixedList from '../../category/data'
import { useParams } from 'react-router'
import productListData from '../data'
const Item = Form.Item
const { Option } = Select;
interface StateProps {
  detail: Product
}

interface Props extends StateProps, DispatchProp {}
const AddProducts = ({detail, dispatch}: Props) => {
  const params  = useParams()
  const productId = (params as {productId: string}).productId
  const product = productListData.find(item => item._id === productId) as Product
  console.log(product)
  const { name, description, price, category} = product || {}
  let { list : categoryList } = useSelector<RootState, CategoryState>(state => state.app.category)
  if(!categoryList.length) {
    categoryList = fixedList
  }
  const onFinish = (product: Product) => {
    if(productId) {
      dispatch(productActions.put(product))
    } else {
      dispatch(productActions.create(product))
    }
  }
  useDocumentTitle(`${productId ? '编辑' : '添加'}商品`)
  const addProductForm = () => {
    return (
      <Form initialValues={{name, description, price, category: category?._id}} onFinish={onFinish}>
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
              return <Select.Option key={item._id} value={item._id as string}>
              {item.name}
            </Select.Option>
            })
          }
          </Select>
        </Item>
        <Item >
          <Button type="primary" htmlType="submit">
          {(productId ? "编辑": "添加")}商品
          </Button>
        </Item>
      </Form>
    )
  }
  return (
    <Layout title={(productId ? "编辑": "添加") + "商品"} subTitle="">
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