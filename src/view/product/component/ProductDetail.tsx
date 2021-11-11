import { Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../type/state'
import { ProductState } from '../type'
import Layout from '../../components/Layout'
import ProductItem  from './ProductItem'
const ProductDetail = () => {
  const {detail} = useSelector<RootState, ProductState>(state => state.app.product)
  return (
    <Layout title="商品名稱" subTitle="商品描述">
        <Row gutter={36}>
          <Col span="18">
            <ProductItem product={detail} showDetail={false}></ProductItem>
          </Col>
          <Col span="6"></Col>
          </Row>
    </Layout>
  )
}
export default ProductDetail
