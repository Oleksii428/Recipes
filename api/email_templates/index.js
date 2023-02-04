const {
	WELCOME,
	FORGOT_PASS,
	NEW_SUBSCRIBER,
	RECIPE_MODERATION,
	NEW_SUBSCRIBED_RECIPE
} = require("../enums/email.actions.enum");

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
	},
	[RECIPE_MODERATION]: {
		subject: "New recipe need moderation",
		templateName: "recipe_moderation"
	},
	[NEW_SUBSCRIBED_RECIPE]: {
		subject: "New recipe from subscribed author",
		templateName: "new_subscribed_recipe"
	}
};
