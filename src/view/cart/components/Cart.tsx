import { Button, Col, Row } from "antd";
import { useMemo, useState, useCallback } from "react";
import { CartItem } from "../type";
import CartItemFc from "./CartItem";
import Layout from "../../components/Layout";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { getCart } from "../../../api/CartApi";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { orderActions } from "../../order";
import { Empty } from "antd";
import { useHistory } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const history = useHistory()
  const dispatch = useDispatch();
  useAuth();
  const showCart = () => (
    <div>
      {cart.map((item) => (
        <CartItemFc
          key={item._id}
          setCart={setCart}
          product={item}
        ></CartItemFc>
      ))}
    </div>
  );
  useDocumentTitle("购物车页面");
  const getTotalPrice = useMemo((): string => {
    return cart
      .reduce((currentValue, nextValue) => {
        return nextValue.price
          ? (currentValue += nextValue.price * nextValue.count)
          : currentValue;
      }, 0)
      .toFixed(2);
  }, [cart]);
  const submitOrder = useCallback(() => {
    dispatch(orderActions.create(cart));
  }, [cart, dispatch]);
  const goHome = useCallback(
    () => {
      history.push('/')
    },
    [history],
  )
  return (
    <Layout title="购物车" subTitle="等待付款~">
      {cart && cart.length > 0 ? (
        <Row gutter={16}>
          <Col span="16">{showCart()}</Col>
          <Col span="8">
            <Row>商品总价：{getTotalPrice}</Row>
            <Row>
              <Button onClick={submitOrder}>提交订单</Button>
              <Button onClick={goHome}>返回商城</Button>
            </Row>
          </Col>
        </Row>
      ) : (
        <Empty description="您的购物车是空的~">
          <Button onClick={goHome}>去购买</Button>
        </Empty>
      )}
    </Layout>
  );
};

export default Cart;
