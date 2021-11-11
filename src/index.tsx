import {async, bootstrap} from "core-fe";
import {ErrorHandler} from "./view/ErrorHandler";
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'
// import {Home} from './module/home/index'
const Home = async(() => import(/* webpackChunkName: "Home" */ "./view/home/index"), "Home");

bootstrap({
  componentType: Home,
  errorListener: new ErrorHandler(),
});