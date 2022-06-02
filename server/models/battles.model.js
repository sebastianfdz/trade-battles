const pool = require("./index");
const table_name = "battles";
const { v4 } = require("uuid");
const user_model = require("./users.model");

exports.getMyBattles = async (user_id) => {
	const allBattles = await pool.query(`SELECT * FROM ${table_name}`);
	const myBattles = allBattles.rows.filter((battle) =>
		battle.battle_members.includes(user_id)
	);

	console.log(myBattles);
	if (myBattles.length === 0) throw new Error("No battles found for this user");

	for (let battleIdx = 0; battleIdx < myBattles.length; battleIdx++) {
		const battleMembers = [];
		for (let member of myBattles[battleIdx].battle_members) {
			const member_obj = await user_model.getUser(member);
			battleMembers.push(...member_obj.rows);
		}
		myBattles[battleIdx].battle_members = battleMembers;
	}
	return Promise.all(myBattles);
};

exports.createBattle = (battle) => {
	const sql = `INSERT INTO ${table_name} (battle_id, battle_members, start_date_timestamp, end_date_timestamp, battle_name) VALUES ($1,$2,$3,$4,$5)`;
	const values = [
		v4(),
		battle.battle_members,
		battle.start_date,
		battle.end_date,
		battle.battle_name,
	];
	const result = pool.query(sql, values);
	return result;
};