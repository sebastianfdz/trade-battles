const fetch = require("node-fetch");
const { APIKEY } = require("./config");
const apibaseurl = "https://cloud.iexapis.com/stable";
exports.getQuote = async (symbol) => {
	const quote = await fetch(
		`${apibaseurl}/stock/${symbol.toLowerCase()}/quote?token=${APIKEY}`
	).then((res) => res.json());

	console.log(quote);

	return quote;
};
