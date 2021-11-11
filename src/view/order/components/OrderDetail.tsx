import { Col, Row } from 'antd'
import Layout from '../../components/Layout'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { RootState } from '../../../type/state'
import { OrderState } from '../type'
import { useSelector } from 'react-redux'
import CartItemFc from '../../cart/components/CartItem'
import { useTimeDown } from '../../../hooks/useTimeDown'
import { useHistory } from 'react-router-dom'
const Cart = () => {
  const { detail } = useSelector<RootState, OrderState>(state => state.app.order)
  const history = useHistory()
  const [second] = useTimeDown(10)
  const showCart = () => (
      <div >
        {
          detail && detail.list && detail.list.map(item => (
            <CartItemFc key={item._id} product={item}></CartItemFc>
          ))
        }
      </div>
  )
  useDocumentTitle('订单详情页面')
  if(second === 0) {
    history.push('/')
  }
  return (
    <Layout title="订单详情页面" subTitle="等待付款~">
      <Row gutter={16}>
        <Col span="16">{showCart()}</Col>
        <Col span="8">
          <Row>
              商品总价：{detail.totalPrice}
          </Row>
        </Col>
      </Row>
      <Row>
        商品总价：{detail.totalPrice}
      </Row>
      <Row>
        请在<span style={{color: 'red'}}>{second}</span>秒内支付订单
      </Row>
    </Layout>
  )
}


export default Cart;
