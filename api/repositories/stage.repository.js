const {Stage} = require("../dataBases");

module.exports = {
	create: (newStage) => Stage.create(newStage),
	addPhoto: (stageId, mediaId) => Stage.findByIdAndUpdate(stageId, {$set: {"photo": mediaId}}, {new: true}),
	findOne: (filter) => Stage.findOne(filter).lean()
};
