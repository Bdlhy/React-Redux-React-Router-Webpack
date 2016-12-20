import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppleItem from '../component/appleItem/AppleItem';
import actions from '../../js/actions/appleAction';

import './AppleBasket.scss'

function selectState(state) {
	return {
		state: state.appleBasket
	}
}

function buildActionDispatcher(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

class AppleBasket extends Component {
	componentDidMount(){
		//初始数据请求
		this.props.actions.initAppleBasket();
	}

	render(){

		let {state, actions} = this.props;

		//遵循reducer里面的数据结构的模拟数据
		let mockState = {
			isPicking: false,
			newAppleId: 3,
			apples: [
				{
					id: 1,
					weight: 235,
					isEaten: false
				},
				{
					id: 2,
					weight: 256,
					isEaten: false
				},
				{
					id: 3,
					weight: 176,
					isEaten: false
				}
			]
		};

		//模拟数据开关，注释之后关闭初始化模拟
		//state = mockState;

		//数据转化为模板数据
		let stats = {
			appleNow: {
				quantity: 0,
				weight: 0
			},
			appleEaten: {
				quantity: 0,
				weight: 0
			}
		};

		state.apples.map(apple => {
			let selector = !apple.isEaten ? 'appleNow' : 'appleEaten';
			stats[selector].quantity ++;
			stats[selector].weight += apple.weight;
		});

		return (
			<div className="appleBusket">
		        <div className="title">苹果篮子</div>
		        
		        <div className="stats">
		            <div className="section">
		                <div className="head">当前</div>
		                <div className="content">
		                	{stats.appleNow.quantity}个苹果，
		                	{stats.appleNow.weight}克
		                </div>
		            </div>
		            <div className="section">
		                <div className="head">已吃掉</div>
		                <div className="content">
		                	{stats.appleEaten.quantity}个苹果，
		                	{stats.appleEaten.weight}克
		                </div>
		            </div>            
		        </div>
		                    
		        <div className="appleList">
		        	{ state.apples.map(apple => (<AppleItem state={apple} actions={{eatApple: actions.eatApple}} key={apple.id}/>)) 
		        	}
		        </div>
		        
		        <div className="btn-div">
		            <button onClick={actions.pickApple}>摘苹果</button>
		        </div>
		        
		    </div>
		);
	}
}

export default connect(selectState, buildActionDispatcher)(AppleBasket);