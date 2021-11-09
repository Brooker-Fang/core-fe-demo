import { FC, useCallback, useEffect } from 'react'
import { Typography } from 'antd'
import { CartItem } from '../type'
const { Title } = Typography
interface Props{
  cart: CartItem [],
  setTotalPrice: (price:number) => void
}
export const TotalPrice:FC<Props> = ({ cart, setTotalPrice}) => {
  const getTotalPrice = useCallback(
    () => {
      return cart.reduce((currentValue, nextValue) => {
        return nextValue.price? (currentValue += nextValue.price * nextValue.count) : currentValue
      }, 0)
      .toFixed(2)
    },
    [cart],
  )
  useEffect(() => {
    setTotalPrice(parseInt(getTotalPrice()))
  }, [cart, setTotalPrice, getTotalPrice])
  return (
    <Title level={5}>
      商品总价：{getTotalPrice()}
    </Title>
  )
}
