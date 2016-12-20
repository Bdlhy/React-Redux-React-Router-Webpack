

const InitState = {
	isPicking: false,
	newAppleId: 1,
	apples: [
		{
			id: 0,
			weight: 0,
			isEaten: false
		}
	]
};

export default (state = InitState, action) => {
	
	let newState;

	switch(action.type) {
		case 'apple/BRGIN_INIT_APPLEBASKET':
			newState = Object.assign({}, state, {
				isPicking: true
			});
			return newState;

		case 'apple/FAIL_INIT_APPLEBASKET':
			newState = Object.assign({}, state, {
				isPicking: false
			});
			return newState;

		case 'apple/DONE_INIT_APPLEBASKET':
			newState = Object.assign({}, state, action.payload);
			return newState;

		case 'apple/BRGIN_PICK_APPLE':
			newState = Object.assign({}, state, {
				isPicking: true
			});
			return newState;

		case 'apple/DONE_PICK_APPLE':
			newState = Object.assign({}, state, {
				apples: [
					...state.apples,
					{
						id: state.newAppleId,
						weight: action.payload,
						isEaten: false
					}
				],
				newAppleId: state.newAppleId + 1,
				isPicking: false
			});
			return newState;

		case 'apple/FAIL_PICK_APPLE':
			newState = Object.assign({}, state, {
				isPicking: false
			});
			return newState;

		case 'apple/EAT_APPLE':
			console.log(state, action)
			newState = Object.assign({}, state, {
				apples: [
					...state.apples.slice(0, action.payload - 1),
					Object.assign({}, state.apples[action.payload - 1], { isEaten: true }),
					...state.apples.slice(action.payload)
				]
			})
			return newState

		default:
			return state;
	}
}