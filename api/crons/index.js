const checkBlockedAuthors = require("./checkBlockedAuthors");

const cronRunner = () => {
	checkBlockedAuthors.start();
};

module.exports = {
	cronRunner
};
