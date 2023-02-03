const {Stage} = require("../dataBases");

module.exports = {
	create: async (newStage) => Stage.create(newStage)
};
