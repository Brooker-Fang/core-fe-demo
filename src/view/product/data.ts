import { Product } from "./type";

 let productListData:Product[] = [{
  _id: "1",
  name: "商品1",
  price: 10,
  description: "商品描述",
  category: {
    _id: "1",
    name: '日常用品'
  }
}, {
  _id: "2",
  name: "商品2",
  price: 10,
  description: "商品描述",
  category: {
    _id: "2",
    name: '篮球'
  }
},
{
  _id: "3",
  name: "商品3",
  price: 10,
  description: "商品描述",
  category: {
    _id: "3",
    name: '家具'
  }
}]
export default productListData