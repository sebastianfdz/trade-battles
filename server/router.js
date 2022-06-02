const router = require("express").Router();
const transactions_controller = require("./controllers/transactions.controller");
const battles_controller = require("./controllers/battles.controller");
const users_controller = require("./controllers/users.controller");

// Transactions
router.get("/transactions", transactions_controller.getAllTransactions);
router.get("/transactions/:id", transactions_controller.getTransaction);
router.get(
	"/transactions/battle/:id",
	transactions_controller.getTransactionsByBattle
);
router.post("/transactions", transactions_controller.postTransaction);
router.delete("/transactions/:id", transactions_controller.deleteTransaction);

// Battles
router.get("/battles/mybattles/:user_id", battles_controller.getMyBattles);
router.post("/battles", battles_controller.postBattle);

// Users
router.get("/users", users_controller.getAllUsers);
router.get("/users/:id", users_controller.getUser);
router.post("/users", users_controller.postUser);
router.put("/users/:id", users_controller.updateUser);
router.delete("/users/:id", users_controller.deleteUser);

module.exports = router;
