import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lockEmployee, setEditdata, openModal, fetchData } from "../app/Action";
import { AiFillLock, AiOutlineLock } from "react-icons/ai";
import "./Table.css";

function rawData(data) {
	if (data.filteredEmployees.length > 0 && data.appliedFilters.length > 0)
		return data.filteredEmployees;
	else return data.employees;
}
function Table() {
	const data = useSelector((state) => state.rootReducer);
	const isOpen = useSelector((state) => state.modalReducer.openModal);
	const dispatch = useDispatch();
	const [isActive, setisActive] = useState("");

	useEffect(() => {
		dispatch(fetchData());
		if (isOpen === false) setisActive("");
	}, [dispatch, isOpen]);

	const rowClicked = (emp, e, i) => {
		if (isActive === i) {
			dispatch(setEditdata(""));
			setisActive("");
			dispatch(openModal(false));
			return;
		}
		if (typeof emp.isLocked === "undefined") emp.isLocked = false;
		let clickedElement = e.target;
		if (
			clickedElement.id === "icon-td" ||
			clickedElement.id === "icon-lock" ||
			clickedElement.id === "icon-lock-fill" ||
			clickedElement.id === "icon-span" ||
			clickedElement.parentNode.id === "icon-lock-fill" ||
			clickedElement.parentNode.id === "icon-lock"
		) {
			setisActive("");
			dispatch(lockEmployee(emp._id));
			return;
		}
		if (emp.isLocked === false) {
			setisActive(i);
			dispatch(
				setEditdata({
					id: emp._id,
					code: emp.code,
					name: emp.name,
					inTime: emp.inTime,
					outTime: emp.outTime,
				})
			);
			dispatch(openModal(true));
		}
	};

	return (
		// nnn { }
		<>
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th>#</th>
							<th>Employee Code</th>
							<th>Employee Name</th>
							<th>In Time</th>
							<th>Out Time</th>
							<th>Hours Worked</th>
							<th>Over Time</th>
						</tr>
					</thead>
					<tbody>
						{rawData(data).map((emp, i) => {
							return (
								<tr
									className={
										isActive === i && isOpen === true ? "isActive" : ""
									}
									key={emp._id}
									onClick={(e) => rowClicked(emp, e, i - 1)}
								>
									<td id="icon-td">
										<span id="icon-span" className="icon-lock-fill">
											{emp.isLocked ? (
												<AiFillLock id="icon-lock-fill" />
											) : (
												<AiOutlineLock id="icon-lock" />
											)}
										</span>
									</td>
									<td className="checkbox">
										{
											<label key={emp._id} htmlFor={emp._id}>
												<input
													type="checkbox"
													name={emp._id}
													checked={
														isActive === i && isOpen === true ? true : false
													}
													onChange={() => {
														console.log("checkbox clicked");
													}}
												/>
											</label>
										}
									</td>
									<td className="employee-count">{i++}</td>
									<td>{emp.code}</td>
									<td>{emp.name}</td>
									<td>{emp.inTime}</td>
									<td>{emp.outTime}</td>
									<td>#</td>
									<td>#</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;
