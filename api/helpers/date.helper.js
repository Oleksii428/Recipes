const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(utc);
dayjs.extend(localizedFormat);

module.exports = {
	getSomeDaysLaterIso: async (daysLater) => {
		return dayjs().add(daysLater, "day").toISOString();
	},
	getPrettyDate: async (date) => {
		return dayjs(date).format("lll");
	},
	isAfterDate: async (date) => {
		return dayjs().isAfter(date);
	}
};
