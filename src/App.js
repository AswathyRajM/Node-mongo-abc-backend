import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Attendence from "./pages/Attendence";
import Events from "./pages/Events";
import "./App.css";
import Documents from "./pages/Documents";
import Employee from "./pages/Employee";

function App() {
	return (
		<div className="main-container">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/employee" component={Employee} />
					<Route path="/attendence" component={Attendence} />
					<Route path="/events" component={Events} />
					<Route path="/documents" component={Documents} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
