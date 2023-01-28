const {WELCOME, FORGOT_PASS} = require("../enums/email.actions.enum");

module.exports = {
	[WELCOME]: {
		subject: "Welcome title",
		templateName: "welcome"
	},
	[FORGOT_PASS]: {
		subject: "Password title",
		templateName: "forgot-pass"
	}
};
