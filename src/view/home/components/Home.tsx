
import {  Switch, Route } from 'react-router-dom'
import Dashboard from '../components/admin/Dashboard'
import Home from '../components/core/Home'
import Login from '../components/core/Login'
import NotFound from '../../NotFound'
const Home = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <Route path="/create/product" exact component={AddProducts} ></Route>
                <Route path="/product/:productId" component={Product}></Route>
                <Route component={NotFound} />
            </Switch>
        </HashRouter>
    );
};

export default Home
