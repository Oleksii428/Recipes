const getPrettyDate = (date: string) =>
	new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(new Date(date));

export {getPrettyDate};
