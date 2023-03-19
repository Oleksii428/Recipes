const path = require("node:path");

module.exports = {
	buildFileName: (fileName, itemType, itemId) => {
		const extension = path.extname(fileName);

		return `${itemType}/${itemId}/${Date.now()}${extension}`;
	}
};
