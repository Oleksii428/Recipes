module.exports = {
	PORT: process.env.PORT || 5000,
	HOST: process.env.HOST || "0.0.0.0",
	MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mongo_url",
	FRONTEND_URL: process.env.FRONTEND_URL || "http://0.0.0.0:3000",
	CREATE_ADMIN_KEY: process.env.CREATE_ADMIN_KEY || "97VFe4@2S$sb%YfV",

	ACCESS_SECRET: process.env.ACCESS_SECRET || "secretAccessWord",
	REFRESH_SECRET: process.env.REFRESH_SECRET || "secretRefreshWord",

	ACCESS_LIFE_TIME: process.env.ACCESS_LIFE_TIME || "10m",
	REFRESH_LIFE_TIME: process.env.REFRESH_LIFE_TIME || "10d",

	NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
	NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,

	FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || "FORGOT_PASSWORD_ACTION_TOKEN_SECRET"
};
