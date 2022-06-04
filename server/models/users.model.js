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

	let stock = {
		price: 0,
		symbol: "",
		change: 0,
		quantity: 0,
		averageCost: 0,
		gain_loss: 0,
	};

	for (let i = 0; i < transactionsArray.length; i++) {
		const current_stock = transactionsArray[i];
		if (uniqueSymbols[current_stock.symbol]) {
			current_stock.action === "BUY"
				? ((stock.quantity += Number(current_stock.quantity)),
				  (stock.averageCost =
						(stock.averageCost * (stock.quantity - current_stock.quantity) +
							Number(current_stock.price) * Number(current_stock.quantity)) /
						stock.quantity))
				: ((stock.quantity -= Number(current_stock.quantity)),
				  (stock.gain_loss +=
						(Number(current_stock.price) - stock.averageCost) *
						Number(current_stock.quantity)));

			stock.symbol = current_stock.symbol;
		} else {
			userPortfolio.push(stock);
			stock = {
				price: 1000,
				symbol: "",
				change: 0,
				quantity: 0,
				averageCost: 0,
				gain_loss: 0,
			};
			current_stock.action === "BUY"
				? ((stock.quantity += Number(current_stock.quantity)),
				  (stock.averageCost =
						(stock.averageCost * (stock.quantity - current_stock.quantity) +
							Number(current_stock.price) * Number(current_stock.quantity)) /
						stock.quantity))
				: ((stock.quantity -= Number(current_stock.quantity)),
				  (stock.gain_loss +=
						(Number(current_stock.price) - stock.averageCost) *
						Number(current_stock.quantity)));

			stock.symbol = current_stock.symbol;
			uniqueSymbols[current_stock.symbol] = true;
			if (i >= transactionsArray.length - 1) {
				userPortfolio.push(stock);
			}
		}
	}

	return userPortfolio.slice(1);
	// price: number;
	// symbol: string;
	// change: number;
	// quantity: number;
	// averageCost: number;
};

exports.updateUser = async (id) => {};
exports.deleteUser = async (id) => {};
