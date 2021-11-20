let initialState = {};

const editDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_EDIT_DATA": {
			return {
				...state,
				editableData: action.payload,
			};
		}

		default:
			return {
				...state,
			};
	}
};

export default editDataReducer;
