const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cors());

const port = process.env.PORT || 5000;
var mongoDB =
	"mongodb+srv://admin:password@cluster0.lugyh.mongodb.net/emp-demo?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
	.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	});

/////////////////////////////Schema///////////////////////////////////

const EmployeeSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	code: {
		type: String,
		max: 10,
	},
	name: {
		type: String,
		max: 25,
	},
	inTime: {
		type: String,
	},
	outTime: {
		type: String,
	},
	isLocked: {
		type: Boolean,
	},
	hoursWorked: {
		type: String,
	},
	overTime: {
		type: String,
	},
});

const Employee = mongoose.model("Employee", EmployeeSchema);

/////////////////////////////////////////////////////////////

///////////////////////////APIs//////////////////////////////

// get
app.get("/api/employees", async (req, res) => {
	try {
		const employees = await Employee.find({});
		res.send(employees);
	} catch (error) {
		res.status(500).send(error);
	}
});

// add
app.post("/api/employees", async (req, res) => {
	const newEmployee = new Employee({
		code: req.body.code,
		name: req.body.name,
		inTime: req.body.inTime,
		outTime: req.body.outTime,
		hoursWorked: "#",
		overTime: "#",
		isLocked: "false",
	});

	await newEmployee.save(function (err) {
		if (err) {
			res.status(500).send(err);
		}
		res.send(newEmployee);
	});
});

//edit
app.post("/api/employees/:id", async (req, res) => {
	const editData = {
		code: req.body.code,
		name: req.body.name,
		inTime: req.body.inTime,
		outTime: req.body.outTime,
	};

	const edit = await Employee.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: editData,
		},
		function (err, employee) {
			if (err) return res.send(err);
		}
	);
	if (editData) res.send(editData);
	else res.send(err);
});

////////////////////////////////////////////////////////////////

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
