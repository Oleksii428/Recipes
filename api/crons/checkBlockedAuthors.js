const {CronJob} = require("cron");

const {dateHelper} = require("../helpers");
const {authorRepository} = require("../repositories");

module.exports = new CronJob(
	// each hour
	"0 0 * * * *",
	async function () {
		try {
			const blockedAuthors = await authorRepository.getBlockedAuthors();

			for (const blockedAuthor of blockedAuthors) {
				const {block, _id} = blockedAuthor;
				const isAfter = await dateHelper.isAfterDate(block);

				if (isAfter) {
					await authorRepository.unlock(_id);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
);
