import { Button, Col, Divider, Input, Row } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '../../../type/state'
import { CartItem } from '../type'
import CartItemFc from './CartItemFc'
import Layout from '../../components/Layout'
import { TotalPrice } from './TotalPrice'
import {connect, DispatchProp} from "react-redux";
interface Props {
  cartList: CartItem[]
}
const Cart = ({cartList}: Props) => {
  const [cart, setCart] = useState<CartItem []>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const showCart = () => (
      <div >
        {
          cartList.map(item => (
            <CartItemFc setCart={setCart} product={item}></CartItemFc>
          ))
        }
      </div>
  )
  return (
    <Layout title="购物车" subTitle="等待付款~">
      <Row gutter={16}>
        {/* 购物车列表 */}
        <Col span="16">{showCart()}</Col>
        <Col span="8">
          <Row>
            {/* 购物车总额 */}
            <TotalPrice cart={cart} setTotalPrice={setTotalPrice}></TotalPrice>
          </Row>
          <Row>
            <Button>提交订单</Button>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}
const mapStateToProps = (state: RootState): Props => {
  return {
      cartList: state.app.cart.cartList,
  };
};

export default connect(mapStateToProps)(Cart);
