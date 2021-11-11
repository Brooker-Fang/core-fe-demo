
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../view/components/Login'
import Register from '../view/components/Register'
import {ProductListPage} from '../view/product'
import OrderPage from '../view/order/components/OrderPage'
import Cart from '../view/cart/components/Cart'
import ProductDetail from '../view/product/component/ProductDetail'
import AddProduct from '../view/product/component/AddProduct'
import AdminDashboard from '../view/components/AdminDashboard'
import AddCategory from '../view/category/components/AddCategory'
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={ProductListPage}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/create/product" exact component={AddProduct}></Route>
      <Route path="/product/:productId" exact component={ProductDetail}></Route>
      <Route path="/create/category" exact component={AddCategory}></Route>
      <Route path="/admin" exact component={AdminDashboard}></Route>
    </Switch>
  )
}

export default Routes
