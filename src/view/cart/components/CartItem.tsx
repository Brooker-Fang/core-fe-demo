import { ChangeEvent, FC, memo, useState } from 'react'
import {Button, Typography, Input, Card, Col, Row  } from 'antd'
import { CartItem } from '../type'
import { deleteItem, updateItem } from '../../../api/CartApi'
const { Title } = Typography
interface Props {
  product: CartItem,
  setCart: (arg: CartItem[]) => void
}
const CartItemFc:FC<Props> = ({ product, setCart }) => {
  const { _id ,name, price, category, description, count:productCount} = product
  const [count, setCount] = useState<number>(productCount)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(event.target.value)
    setCart(updateItem(product._id!, count))
    setCount(count)
  }
  const showButtons = () => {
    let buttonArray = []
    buttonArray.push(<Input type="number" value={count} onChange={handleChange}></Input>)
      buttonArray.push(<Button onClick={() => setCart(deleteItem(_id!))} danger type="primary">
      删除
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

export default memo(CartItemFc)
