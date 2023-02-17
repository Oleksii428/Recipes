const {Stage} = require("../dataBases");

module.exports = {
	addPhoto: (stageId, mediaId) => Stage.findByIdAndUpdate(stageId, {$set: {"photo": mediaId}}, {new: true}),
	create: (newStage) => Stage.create(newStage),
	deleteById: (id) => Stage.deleteOne(id),
	findById: (id) => Stage.findById(id).lean(),
	findOne: (filter) => Stage.findOne(filter).lean(),
	update: (stageId, newStage) => Stage.findByIdAndUpdate(stageId, newStage)
};
