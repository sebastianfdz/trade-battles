const pool = require("./index");
const table_name = "users";
const { v4 } = require("uuid");

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
exports.updateUser = async (id) => {};
exports.deleteUser = async (id) => {};
