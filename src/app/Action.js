import axios from "axios";

const apiUrl = `http://localhost:5000/api/employees`;

export const fetchData = () => async (dispatch) => {
	try {
		const res = await axios.get(apiUrl);
		dispatch({
			type: "ADD_FETCHED_DATA",
			payload: res.data,
		});
	} catch (error) {
		console.log(error.messsage);
	}
};

export const addEmployee = (emp) => async (dispatch) => {
	try {
		const { data } = await axios.post(apiUrl, emp);
		console.log(data);

		dispatch({ type: "ADD_EMPLOYEE", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const editEmployee = (id, emp) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${apiUrl}/${id}`, emp);
		data._id = id;
		dispatch({ type: "EDIT_EMPLOYEE", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const lockEmployee = (id) => ({
	type: "LOCK_DATA",
	payload: id,
});

export const setEditdata = (data) => ({
	type: "SET_EDIT_DATA",
	payload: data,
});
export const openModal = (data) => ({
	type: "OPEN_MODAL",
	payload: data,
});
export const getModal = () => ({
	type: "GET_MODAL_STATE",
});

export const filterByValue = (data) => ({
	type: "FILTER_BY_VALUE",
	payload: data,
});
