const {Media} = require("../dataBases");

module.exports = {
	create: async (newMedia) => Media.create(newMedia)
};
