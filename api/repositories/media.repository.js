const {Media} = require("../dataBases");

module.exports = {
	create: (newMedia) => Media.create(newMedia)
};
