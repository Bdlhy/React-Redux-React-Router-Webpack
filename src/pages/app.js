import React, {Component} from 'react';//react以及组件类
import { render } from 'react-dom';//render函数
import {Provider} from 'react-redux';//redux最外层容器层
import {createStore, applyMiddleware, combineReducers} from 'redux';//redux store创建函数和中间层
import thunk from 'redux-thunk';//redux异步请求
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';//react-router
import reducers from '../js/reducers/reducers';//自己写的reducers
import '../css/common.scss';//基础公共样式页面内引用

//子页组件引用
import Page1 from './page1/index';
import Page2 from './page2/index';
import Page3 from './page3/index';
import AppleBasket from './appleBasket/AppleBasket'

class Application extends Component{
	render() {
		return (
			<div>
				<div className="header">
					<Link to="page1">page1</Link>
					<Link to="page2">page2</Link>
					<Link to="page3">page3</Link>
				</div>
				{this.props.children}
			</div>
		)
	}
}

const reducer = combineReducers({
    appleBasket: reducers
})

const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

console.log(store.getState());

render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Application}>
				<IndexRoute component={Page1}/>
				<Route path="page1" component={Page1}></Route>
				<Route path="page2" component={Page2}></Route>
				<Route path="page3" component={AppleBasket}></Route>
			</Route>
		</Router>
	</Provider>
), document.getElementById('app'));
