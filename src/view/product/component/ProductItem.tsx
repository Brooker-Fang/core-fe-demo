import React, { FC, memo, useCallback } from 'react'
import { Button, Card, Typography, Row } from 'antd'
import { Link } from 'react-router-dom'
import { Product } from '../type'
import { addItem } from '../../../api/CartApi'
import { useDispatch} from "react-redux";
import { productActions } from '..'
const { Title } = Typography
interface Props{
  product: Product,
  showDetail?: boolean
}
 const ProductItem:FC<Props> = ({product, showDetail = true} ) => {
  const dispatch = useDispatch()
  const { name, description, price, category } = product
  const addToCart = () => {
    addItem(product)
  }
  const goProductDetail = useCallback(
    () => {
      dispatch(productActions.get(product))
    },
    [product, dispatch],
  )
  const showButtons = () => {
    let buttonArray = []
    if(showDetail) {
      buttonArray.push(<Button type="link" onClick={goProductDetail}>
      {/* <Link to={`/product/${product._id}`}>查看详情</Link> */}
      查看详情
    </Button>)
    }
    
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
      描述：{description}
    </Row>
    <Row>
      价格：{price}
    </Row>
    <Row>
      类型：{category?.name}
    </Row>
  </Card>
  )
}
export default memo(ProductItem)
