require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
const mongoose = require("mongoose");
const cors = require("cors");

const {MONGO_URL, PORT, HOST} = require("./configs/config");
const {
	authorRouter,
	authRouter,
	categoryRouter,
	kitchenRouter,
	recipeRouter,
	stageRouter,
	reviewRouter,
	roleRouter
} = require("./routers");
const {cronRunner} = require("./crons");
const swaggerJson = require("./swagger.json");
const path = require("path");

const app = express();
app.use(cors({
	origin: "http://localhost:3000",
	methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
	credentials: true,
	optionSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(process.cwd(), "uploads")));
app.use(fileUpload());

app.get("/", (req, res) => {
	res.json(`Listening port: ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/authors", authorRouter);
app.use("/categories", categoryRouter);
app.use("/kitchens", kitchenRouter);
app.use("/stages", stageRouter);
app.use("/recipes", recipeRouter);
app.use("/reviews", reviewRouter);
app.use("/role", roleRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

const start = async () => {
	try {
		let dbConnected = false;

		while (!dbConnected) {
			try {
				console.log("Connecting to database...");
				mongoose.set("strictQuery", false);
				await mongoose.connect(MONGO_URL);
				dbConnected = true;
				console.log(`Server is listening port: ${PORT}`);
				cronRunner();
				console.log("Started cron");
			} catch (e) {
				console.log("Database unavailable, wait 3 sec");
				await new Promise(resolve => setTimeout(resolve, 3000));
			}
		}

		await app.listen(+PORT, HOST);
	} catch (e) {
		console.log(e);
	}
};

start();
