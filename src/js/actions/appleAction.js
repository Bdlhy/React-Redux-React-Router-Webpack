import ajax from '../common/ajax';// 这里引用封装好的ajax函数
import $ from 'jquery';

//名称空间
const prefix = 'apple/';

let actions = {

	initAppleBasket: () => (dispatch, getState) => {
		//初始化苹果篮，action分发最初
		//这里状态用isPicking阻塞
		if(getState().isPicking){ return; }

		//开始初始化数据加载
		dispatch(actions.beginInit());

		//发送请求
		$.ajax({
			url: 'http://127.0.0.1:3000/api/init',
			type: 'GET',
			async : true,
			success: (res) => {
				dispatch(actions.doneInit(res.data))
			},
			error: (xhr) => {
				dispatch(actions.failInit(xhr.responseText))
			}
		});
	},
	//初始化三状态
	beginInit: () => ({
		type: 'apple/BRGIN_INIT_APPLEBASKET'
	}),
	doneInit: data => ({
		type: 'apple/DONE_INIT_APPLEBASKET',
		payload: data
	}),
	failInit: errMsg => ({
		type: 'apple/FAIL_INIT_APPLEBASKET',
		payload: new Error(errMsg),
		error: true
	}),

	pickApple: () => (dispatch, getState) => {

		//如果正在摘苹果，则阻塞跳过这个thunk
		if(getState().isPicking){ return; }

		//通知开始摘苹果
		dispatch(actions.beginPickApple());

		//发送摘苹果请求	
		$.ajax({
			url: 'http://127.0.0.1:3000/api/getMore',
			type: 'GET',
			async : true,
			success: (res) => {
				dispatch(actions.donePickApple(res.data.weight));
			},
			error: (xhr) => {
				dispatch(actions.failPickApple(xhr.responseText));
			}
		});
	},
	//摘苹果三状态
	beginPickApple: () => ({
		type: 'apple/BRGIN_PICK_APPLE'
	}),
	donePickApple: appleWeight => ({
		type: 'apple/DONE_PICK_APPLE',
		payload: appleWeight
	}),
	failPickApple: errMsg => ({
		type: 'apple/FAIL_PICK_APPLE',
		payload: new Error(errMsg),
		error: true
	}),

	eatApple: appleId => ({
		type: 'apple/EAT_APPLE',
		payload: appleId
	})
};

export default actions;