const quotes_model = require("../models/quotes.model");

exports.getQuote = async (req, res) => {
	try {
		const quote = await quotes_model.getQuote(req.params["symbol"]);
		res.send(quote);
		res.status(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
