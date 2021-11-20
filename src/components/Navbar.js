import React from "react";
import { NavLink } from "react-router-dom";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
	return (
		<div className="navbar-container">
			<nav>
				<ul>
					<li>
						<NavLink
							exact
							className="link"
							to="/employee"
							activeClassName="active"
						>
							<FaRegUser />
							<span>Employee</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							className="link"
							to="/attendence"
							activeClassName="active"
						>
							<BiUser />
							<span>Attendence</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							className="link"
							to="/events"
							activeClassName="active"
						>
							<BiUserCircle />
							<span>Events</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							className="link"
							to="/documents"
							activeClassName="active"
						>
							<IoDocumentsOutline />
							<span>Documents</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
