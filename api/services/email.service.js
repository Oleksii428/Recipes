const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const {config} = require("../configs");
const emailTemplates = require("../email_templates");
const {ApiError} = require("../errors");


const sendEmail = async (receiverEmail, emailAction, locals = {}) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: config.NO_REPLAY_EMAIL,
			pass: config.NO_REPLAY_EMAIL_PASSWORD
		}
	});

	const templateInfo = emailTemplates[emailAction];

	if (!templateInfo?.subject || !templateInfo.templateName) {
		throw new ApiError("Wrong template", 500);
	}

	const options = {
		viewEngine: {
			defaultLayout: "main",
			layoutsDir: path.join(process.cwd(), "email_templates", "layouts"),
			partialsDir: path.join(process.cwd(), "email_templates", "partials"),
			extname: ".hbs"
		},
		extName: ".hbs",
		viewPath: path.join(process.cwd(), "email_templates", "views")
	};

	transporter.use("compile", hbs(options));

	locals.frontendURL = config.FRONTEND_URL;

	return transporter.sendMail({
		from: "User name",
		to: receiverEmail,
		subject: templateInfo.subject,
		template: templateInfo.templateName,
		context: locals
	});
};

module.exports = {
	sendEmail
};
