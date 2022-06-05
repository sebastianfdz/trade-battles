const pool = require("./index");
const table_name = "transactions";
const { v4 } = require("uuid");

exports.getAllTransactions = () => {
	const result = pool.query(`SELECT * FROM ${table_name}`);
	return result;
};

exports.getTransactionsByBattle = (id) => {
	const result = pool.query(
		`SELECT * FROM ${table_name} WHERE battle_id = '${id}'`
	);
	return result;
};

exports.getTransaction = (id) => {
	const result = pool.query(
		`SELECT * FROM ${table_name} WHERE transaction_id = '${id}'`
	);
	return result;
};

exports.createTransaction = (transaction) => {
	const sql = `INSERT INTO ${table_name} (transaction_id, battle_id, user_id, transaction_timestamp, action, symbol, price, quantity) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
	const values = [
		v4(),
		transaction.battle_id,
		transaction.user_id,
		Date.now(),
		transaction.action,
		transaction.symbol,
		transaction.price,
		transaction.quantity,
	];

	return pool.query(sql, values);
};

exports.deleteTransaction = (id) => {
	const result = pool.query(
		`DELETE FROM ${table_name} WHERE transaction_id = '${id}'`
	);
	return { result: `Transaction with id ${id} was succesfully deleted` };
};

exports.filterTransactionsByUserIdBattleId = async (user_id, battle_id) => {
	const result = await pool.query(
		`SELECT * FROM ${table_name} WHERE battle_id = '${battle_id}' AND user_id = '${user_id}' ORDER BY symbol,action ASC`
	);
	return result;
};
