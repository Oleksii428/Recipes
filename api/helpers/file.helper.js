const path = require("node:path");
const fs = require("fs");

module.exports = {
	buildFileName: (fileName, itemType, itemId) => {
		const extension = path.extname(fileName);

		if (!fs.existsSync(`./uploads/${itemType}`)) {
			fs.mkdir(path.join(process.cwd(), "uploads", itemType), (err) => {
				if (err) {
					console.log(err);
				}
			});
		}
		if (!fs.existsSync(`./uploads/${itemType}/${itemId}`)) {
			fs.mkdir(path.join(process.cwd(), "uploads", itemType, itemId), (err) => {
				if (err) {
					console.log(err);
				}
			});
		}

		return `${itemType}/${itemId}/${Date.now()}${extension}`;
	}
};
