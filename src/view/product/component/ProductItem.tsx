import React, { FC, memo } from 'react'
import { Button, Card, Col, Typography, Row } from 'antd'
import { Link } from 'react-router-dom'
import { Product } from '../type'
import { addItem } from '../../../api/CartApi'
const { Title } = Typography
interface Props{
  product: Product
}
 const ProductItem:FC<Props> = ({product}) => {
  const { name, description, price, category } = product
  const addToCart = () => {
    addItem(product)
  }
  const showButtons = () => {
    let buttonArray = []
    buttonArray.push(<Button type="link">
      <Link to={`/product/${product._id}`}>查看详情</Link>
    </Button>)
      buttonArray.push(<Button type="link" onClick={addToCart}>
      加入购物车
    </Button>)
    return buttonArray
  }
  return (
    <Card
      actions={showButtons()}
    >
    <Title level={5}>{name}</Title>
    <Row>
      <Col span="12">描述：{description}</Col>
    </Row>
    <Row>
      <Col span="12">价格：{price}</Col>
    </Row>
    <Row>
      <Col span="12">类型：{category?.name}</Col>
    </Row>
  </Card>
  )
}
export default memo(ProductItem)
