const {Stage} = require("../dataBases");

module.exports = {
	create: async (newStage) => Stage.create(newStage),
	addPhoto: async (stageId, mediaId) => Stage.findByIdAndUpdate(stageId, {$set: {"photo": mediaId}}, {new: true}),
	findOne: async (filter) => Stage.findOne(filter)
};
