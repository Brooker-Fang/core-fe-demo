
import {  Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import NotFound from '../../NotFound'
const Home = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
            {/* <Route path="/register" exact component={Register}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/create/product" exact component={AddProducts} ></Route>
            <Route path="/product/:productId" component={Product}></Route> */}
        </Switch>
    );
};

export default Home
