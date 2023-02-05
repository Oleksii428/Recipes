const {
	WELCOME,
	FORGOT_PASS,
	NEW_SUBSCRIBER,
	CREATE_RECIPE_MODERATION,
	UPDATE_RECIPE_MODERATION,
	NEW_SUBSCRIBED_RECIPE,
	COMPLAIN
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
	[NEW_SUBSCRIBED_RECIPE]: {
		subject: "New recipe from subscribed author",
		templateName: "new_subscribed_recipe"
	},
	[CREATE_RECIPE_MODERATION]: {
		subject: "New recipe needs moderation",
		templateName: "create_recipe_moderation"
	},
	[UPDATE_RECIPE_MODERATION]: {
		subject: "Updated recipe needs moderation",
		templateName: "update_recipe_moderation"
	},
	[COMPLAIN]: {
		subject: "New complain",
		templateName: "complain"
	}
};
