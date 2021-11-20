let initialState = false;

const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_MODAL_STATE":
			return {
				...state,
			};
		case "OPEN_MODAL":
			return {
				openModal: action.payload,
				// openmodel:!state.openmodel
			};

		default:
			return {
				...state,
			};
	}
};

export default modalReducer;
