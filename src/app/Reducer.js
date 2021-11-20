let initialState = {
	employees: [],
	appliedFilters: [],
	filteredEmployees: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_FETCHED_DATA": {
			return {
				...state,
				employees: action.payload,
			};
		}
		case "ADD_EMPLOYEE": {
			return {
				...state,
				employees: state.employees.concat(action.payload),
			};
		}
		case "LOCK_DATA": {
			return {
				...state,
				employees: state.employees.map((employee) => {
					if (employee._id !== action.payload) {
						return employee;
					}

					return {
						...employee,
						isLocked: !employee.isLocked,
					};
				}),
			};
		}
		case "FILTER_BY_VALUE":
			// //the value passed from our presentational component
			// let value = action.payload;
			// let filteredValues = state.employees.filter((employee) => {
			// 	//return any product whose name or designer contains the input box string
			// 	return employee.name.toLowerCase().includes(value);
			// 	//|| employee.designer.toLowerCase().includes(value)
			// });
			// return {
			// 	...state,
			// 	employees: filteredValues,
			// };
			let newState = Object.assign({}, state);
			//the value received from our presentational component
			let value = action.payload;
			let filteredValues = state.employees.filter((employee) => {
				//look for objects with the received value in their ‘name’ or ‘designer’ fields
				return employee.name.toLowerCase().includes(value);
			});

			let appliedFilters = state.appliedFilters;
			//if the value from the input box is not empty
			if (value) {
				//check if the filter already exists in the tracking array
				let index = appliedFilters.indexOf("FILTER_BY_VALUE");
				if (index === -1)
					//if it doesn’t, add it.
					appliedFilters.push("FILTER_BY_VALUE");
				//change the filtered products to reflect the change
				newState.filteredEmployees = filteredValues;
			} else {
				//if the value is empty, we can assume everything has been erased
				let index = appliedFilters.indexOf("FILTER_BY_VALUE");
				//in that case, remove the current filter
				appliedFilters.splice(index, 1);
				if (appliedFilters.length === 0) {
					//if there are no filters applied, reset the products to normal.
					newState.filteredEmployees = newState.employees;
				}
			}
			return newState;

		case "EDIT_EMPLOYEE": {
			return {
				...state,
				employees: state.employees.map((employee) => {
					if (employee._id !== action.payload._id) {
						return employee;
					}

					return {
						...employee,
						name: action.payload.name,
						code: action.payload.code,
						inTime: action.payload.inTime,
						outTime: action.payload.outTime,
					};
				}),
			};
		}

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
