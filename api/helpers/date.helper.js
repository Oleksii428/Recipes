const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(utc);
dayjs.extend(localizedFormat);

module.exports = {
	getSomeDaysLaterIso: (daysLater) => dayjs().add(daysLater, "day").toISOString(),
	getPrettyDate: (date) => dayjs(date).format("lll"),
	isAfterDate: (date) => dayjs().isAfter(date)
};
