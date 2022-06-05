const pool = require("./index");
const table_name = "users";
const { v4 } = require("uuid");
const transaction_model = require("./transactions.model");

exports.getAllUsers = () => {
	const users = pool.query(`SELECT * FROM ${table_name}`);
	return users;
};
exports.getUser = (id) => {
	const user = pool.query(
		`SELECT * FROM ${table_name} WHERE user_id = '${id}'`
	);
	return user;
};
exports.createUser = async (user) => {
	const existingUsers = await pool.query(
		`SELECT * FROM ${table_name} WHERE username = '${user.username}'`
	);

	if (existingUsers.rows.length) {
		throw new Error("Username already exists");
	} else {
		const sql = `INSERT INTO ${table_name} (user_id, first_name, last_name, username, battles) VALUES ($1,$2,$3,$4,$5)`;
		const values = [
			v4(),
			user.first_name,
			user.last_name,
			user.username,
			user.battles,
		];
		pool.query(sql, values);
		return user;
	}
};

exports.getUserPortfolio = async (user_id, battle_id) => {
	let transactions = await transaction_model.filterTransactionsByUserIdBattleId(
		user_id,
		battle_id
	);
	let transactionsArray = transactions.rows;

	console.log(transactionsArray);

	const userPortfolio = [];
	const uniqueSymbols = {};

	for (let i = 0; i < transactionsArray.length; i++) {
		if (!uniqueSymbols[transactionsArray[i].symbol]) {
			uniqueSymbols[transactionsArray[i].symbol] = true;
		}
	}

	console.log(Object.keys(uniqueSymbols));

	let stock = {
		price: 0,
		symbol: "",
		change: 0,
		quantity: 0,
		averageCost: 0,
		gain_loss: 0,
	};

	let key = 0;
	let currentSymbol = Object.keys(uniqueSymbols)[key];
	for (let i = 0; i < transactionsArray.length; i++) {
		let currentStock = transactionsArray[i];
		console.log(currentStock);
		if (currentStock.symbol !== currentSymbol) {
			// stock changed...
			// push stock to userPortfolio
			userPortfolio.push(stock);
			// set stock to default
			stock = {
				price: 0,
				symbol: "",
				change: 0,
				quantity: 0,
				averageCost: 0,
				gain_loss: 0,
			};

			key++;
			currentSymbol = Object.keys(uniqueSymbols)[key];
		}

		// stock remains the same
		stock.symbol = currentStock.symbol;
		if (currentStock.action === "BUY") {
			let tempQuantity = stock.quantity;
			stock.quantity += Number(currentStock.quantity);
			console.log(stock.symbol, stock.quantity);
			let tempAvCost = stock.averageCost;

			stock.averageCost =
				(tempQuantity * tempAvCost +
					Number(currentStock.quantity) * Number(currentStock.price)) /
				stock.quantity;
		} else {
			stock.quantity -= Number(currentStock.quantity);
			console.log(stock.symbol, stock.quantity);
			stock.gain_loss +=
				(currentStock.price - stock.averageCost) * currentStock.quantity; // TODO -> CHECK NUMBERS
		}

		if (key >= Object.keys(uniqueSymbols).length - 1 && !userPortfolio[key]) {
			userPortfolio.push(stock);
		}
	}

	return userPortfolio;
};

exports.updateUser = async (id) => {};
exports.deleteUser = async (id) => {};
