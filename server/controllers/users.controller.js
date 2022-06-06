const users_model = require("../models/users.model");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await users_model.getAllUsers();
		res.send(users.rows);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
exports.getUser = async (req, res) => {
	try {
		const user = await users_model.getUser(req.params["id"]);
		res.send(user);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
exports.postUser = async (req, res) => {
	try {
		const user = await users_model.createUser(req.body);
		res.send(user);
		res.status(201);
	} catch (error) {
		// TODO, ERROR HANDLING FOR CREATING A USER WITH AN EXISTING USERNAME
		console.error(error);
		res.sendStatus(500);
	}
};
exports.updateUser = async (req, res) => {
	try {
		const user = await users_model.updateUser(req.params["id"]);
		res.send(user);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
exports.deleteUser = async (req, res) => {
	try {
		const user = await users_model.deleteUser(req.params["id"]);
		res.send(user);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

exports.getUserPortfolio = async (req, res) => {
	try {
		const userPortfolio = await users_model.getUserPortfolio(
			req.params["user_id"],
			req.params["battle_id"]
		);
		res.send(userPortfolio);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
