import React from "react";
import { IconContext } from "react-icons";
import { CgMenuGridR } from "react-icons/cg";
import { BiSearch, BiExport } from "react-icons/bi";
import { BsFilter, BsChevronDown } from "react-icons/bs";
import { GrDocumentUpload } from "react-icons/gr";
import { HiOutlineRefresh } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { openModal, filterByValue } from "../app/Action";
import Slide from "react-reveal/Slide";

import "./Attendence.css";
import Table from "../components/Table";
import Modal from "../components/Modal";

function Attendence() {
	const dispatch = useDispatch();

	const setOpenModal = () => {
		dispatch(openModal(true));
	};

	const filterByInput = (e) => {
		let input = e.target.value;
		dispatch(filterByValue(input));
	};

	const open = useSelector((state) => state.modalReducer.openModal);

	return (
		<>
			<div className="left-container">
				<div className="top-bar">
					<div className="about-user">
						<img
							src="https://randomuser.me/api/portraits/women/24.jpg"
							alt="user-img"
						/>
						<div className="user-details">
							<h3>Fathima Al Khasim</h3>
							<p>Manager</p>
						</div>
					</div>
					<IconContext.Provider value={{ size: "2rem" }}>
						<CgMenuGridR />
					</IconContext.Provider>
				</div>
				<div className="modal-class">
					<Slide right when={typeof open === "undefined" ? false : open}>
						<Modal />
					</Slide>
				</div>
				<div className="table">
					<div className="table-container">
						<h1>Attendence</h1>
						<div className="button-container">
							<div className="search-container">
								<span className="search-button">
									<BiSearch />
								</span>
								<input
									type="text"
									className="text-field"
									placeholder="Search"
									onChange={(e) => {
										filterByInput(e);
									}}
								></input>
							</div>

							<div className="right-buttons-container">
								<IconContext.Provider value={{ className: "button-icon" }}>
									<button onClick={setOpenModal}>
										<span className="make">
											<GrDocumentUpload />
											<span>Upload</span>
										</span>
									</button>
									<button>
										<span>
											<BsFilter />
											<span>Filter</span>
										</span>
									</button>
									<button>
										<span>
											<BiExport />
											<span>Export</span>
											<BsChevronDown />
										</span>
									</button>

									<button>
										<span>
											<HiOutlineRefresh />
											<span>Refresh</span>
										</span>
									</button>
								</IconContext.Provider>
							</div>
						</div>

						<div className="attendence-counts">
							<div className="total-counts working">
								<h1>3</h1>
								<p>Total Working Employees</p>
							</div>

							<div className="total-counts absentees">
								<h1>5</h1>
								<p>Total Number of Absentees</p>
							</div>

							<div className="total-counts approved-leaves">
								<h1>8</h1>
								<p>Total Approved Leaves</p>
							</div>

							<div className="total-counts halfday-leaves">
								<h1>15</h1>
								<p>Half-day Leave Requests</p>
							</div>

							<div className="total-counts late-comers">
								<h1>22</h1>
								<p>Total Late Comers</p>
							</div>
						</div>
						<Table />
					</div>
				</div>
			</div>
		</>
	);
}

export default Attendence;
