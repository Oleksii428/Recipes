const {WELCOME, FORGOT_PASS, NEW_SUBSCRIBER} = require("../enums/email.actions.enum");

module.exports = {
	[WELCOME]: {
		subject: "Welcome title",
		templateName: "welcome"
	},
	[FORGOT_PASS]: {
		subject: "Password title",
		templateName: "forgot-pass"
	},
	[NEW_SUBSCRIBER]: {
		subject: "New subscriber title",
		templateName: "new_subscriber"
	}
};
