import {async, bootstrap} from "core-fe";
import {ErrorHandler} from "./module/ErrorHandler";
import ReactDOM from 'react-dom'
import App from './App'
// import {Home} from './module/home/index'
const Home = async(() => import(/* webpackChunkName: "Home" */ "./module/home"), "Home");

bootstrap({
  componentType: Home,
  errorListener: new ErrorHandler(),
});
// ReactDOM.render(
//   <App >
//   </App>,
//   document.getElementById('root')
// )