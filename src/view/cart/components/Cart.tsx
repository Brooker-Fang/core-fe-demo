import { Button, Col, Row } from 'antd'
import { useMemo, useState } from 'react'
import { CartItem } from '../type'
import CartItemFc from './CartItem'
import Layout from '../../components/Layout'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { getCart } from '../../../api/CartApi'
import { useAuth } from '../../../hooks/useAuth'
const Cart = () => {
  const [cart, setCart] = useState<CartItem []>(getCart())
  useAuth()
  const showCart = () => (
      <div >
        {
          cart.map(item => (
            <CartItemFc key={item._id} setCart={setCart} product={item}></CartItemFc>
          ))
        }
      </div>
  )
  useDocumentTitle('购物车页面')
  const getTotalPrice = useMemo(
    (): string => {
      return cart.reduce((currentValue, nextValue) => {
        return nextValue.price? (currentValue += nextValue.price * nextValue.count) : currentValue
      }, 0)
      .toFixed(2)
    },
    [cart],
  )
  return (
    <Layout title="购物车" subTitle="等待付款~">
      <Row gutter={16}>
        <Col span="16">{showCart()}</Col>
        <Col span="8">
          <Row>
              商品总价：{getTotalPrice}
          </Row>
          <Row>
            <Button>提交订单</Button>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}


export default Cart;
