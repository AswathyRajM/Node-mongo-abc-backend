import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/Reducer";
import editDataReducer from "./app/SetEditemployee";
import modalReducer from "./app/Modal";
import App from "./App";
const reducer = combineReducers({
	rootReducer,
	editDataReducer,
	modalReducer,
});

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App />,
	</Provider>,
	document.getElementById("root")
);
