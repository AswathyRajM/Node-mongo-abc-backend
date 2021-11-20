import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import {
	openModal,
	addEmployee,
	setEditdata,
	editEmployee,
} from "../app/Action";
import "./Modal.css";

function Popup() {
	const dispatch = useDispatch();
	const { editableData: editdata } = useSelector(
		(state) => state.editDataReducer
	);

	const openModalfun = () => {
		dispatch(setEditdata(""));
		dispatch(openModal(false));
		setName("");
		setCode("");
		setIntime("");
		setOuttime("");
	};

	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [intime, setIntime] = useState("");
	const [outtime, setOuttime] = useState("");

	const [timeError, settimeError] = useState("");
	const [nameError, setNameError] = useState("");
	const [codeError, setCodeError] = useState("");

	useEffect(() => {
		if (editdata) {
			setName(editdata.name);
			setCode(editdata.code);
			setIntime(editdata.inTime);
			setOuttime(editdata.outTime);
		}
	}, [editdata]);

	const checkValidation = () => {
		let valid = true;
		settimeError("");
		setNameError("");
		setCodeError("");

		if (intime === "" || outtime === "") {
			settimeError("Out time and In time can't be empty");
			valid = false;
			return;
		} else {
			if (name === "") {
				setNameError("Name can't be empty");
				valid = false;
				return;
			} else {
				if (code === "") {
					setCodeError("Code can't be empty");
					valid = false;
					return;
				}
			}
		}
		if (intime > outtime) {
			settimeError("Out time must be less than In time");
			setIntime("");
			setOuttime("");
			valid = false;
		}
		if (
			name.length < 3 ||
			name.length > 25 ||
			/^[A-Za-z ]+$/.test(name) === false
		) {
			setNameError("Invalid name");
			setName("");
			valid = false;
		}

		if (code.length < 3 || code.length > 10) {
			setCodeError("Invalid code");
			setCode("");
			valid = false;
		}
		if (code && name && intime && outtime && valid) {
			openModalfun();
			if (editdata) {
				dispatch(setEditdata(""));
				dispatch(
					editEmployee(editdata.id, {
						code,
						name,
						inTime: intime,
						outTime: outtime,
					})
				);

				alert("Employee details saved!");
			} else {
				dispatch(
					addEmployee({
						code,
						name,
						inTime: intime,
						outTime: outtime,
					})
				);
				alert("Employee details added!");
				dispatch(setEditdata(""));
			}
			setName("");
			setCode("");
			setIntime("");
			setOuttime("");
		}
	};

	return (
		<div className="modal">
			<div className="close-icon" onClick={openModalfun}>
				<IconContext.Provider value={{ size: "1.7rem" }}>
					<AiOutlineClose />
				</IconContext.Provider>
			</div>
			<div className="modal-container">
				<h1>{heading(editdata)}</h1>
				<div className="input-conatainer">
					<label className="labels">Employee Code</label>
					<input
						id="code"
						placeholder="Employee Code"
						value={code}
						type="text"
						onChange={(e) => {
							setCode(e.target.value);
						}}
						required
					></input>
					{codeError ? <label className="error">{codeError}</label> : ""}
				</div>
				<div className="input-conatainer">
					<label className="labels">Employee Name</label>
					<input
						id="name"
						placeholder="Employee Name"
						value={name}
						required
						type="text"
						onChange={(e) => {
							setName(e.target.value);
						}}
					></input>
					{nameError ? <label className="error">{nameError}</label> : ""}
				</div>
				<div className="time-container">
					<div className="input-conatainer">
						<label className="labels">In time</label>
						<input
							id="intime"
							placeholder="In time"
							value={intime}
							type="time"
							onChange={(e) => {
								setIntime(e.target.value);
							}}
							required
						></input>
					</div>
					<div className="input-conatainer">
						<label className="labels">Out time</label>
						<input
							id="outtime"
							placeholder="Out time"
							value={outtime}
							type="time"
							onChange={(e) => {
								setOuttime(e.target.value);
							}}
							required
						></input>
					</div>
				</div>
				<div className="time-container">
					{timeError ? (
						<label className="error time-error">{timeError}</label>
					) : (
						<label></label>
					)}
				</div>

				<div className="buttons">
					<button
						className="save-button "
						onClick={() => {
							checkValidation();
						}}
					>
						save
					</button>
					<button className="cancel-button " onClick={openModalfun}>
						cancel
					</button>
				</div>
			</div>
		</div>
	);
}
function heading(state) {
	if (typeof state === "undefined" || state === "") return "add details";

	return "edit data";
}

export default Popup;
