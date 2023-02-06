const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {ApiError} = require("../errors");
const {config} = require("../configs");
const {tokenActions, tokenTypes} = require("../enums");

module.exports = {
	checkActionToken: (token, actionType) => {
		try {
			let secretWord = "";

			switch (actionType) {
				case tokenActions.FORGOT_PASSWORD:
					secretWord = config.FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
					break;
			}

			jwt.verify(token, secretWord);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	},
	checkToken: (token = "", tokenType = tokenTypes.accessToken) => {
		try {
			let secretWord = "";

			switch (tokenType) {
				case tokenTypes.accessToken:
					secretWord = config.ACCESS_SECRET;
					break;
				case tokenTypes.refreshToken:
					secretWord = config.REFRESH_SECRET;
					break;
			}

			return jwt.verify(token, secretWord);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	},
	comparePasswords: async (hashPassword, password) => {
		const isPasswordsSame = await bcrypt.compare(password, hashPassword);

		if (!isPasswordsSame) {
			throw new ApiError("Wrong password", 400);
		}
	},
	generateActionToken: (actionType, dataToSign = {}) => {
		let secretWord = "";

		switch (actionType) {
			case tokenActions.FORGOT_PASSWORD:
				secretWord = config.FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
				break;
		}

		return jwt.sign(dataToSign, secretWord, {expiresIn: "1d"});
	},
	generateTokenPair: (dataToSign = {}) => {
		const accessToken = jwt.sign(dataToSign, config.ACCESS_SECRET, {expiresIn: "15m"});
		const refreshToken = jwt.sign(dataToSign, config.REFRESH_SECRET, {expiresIn: "30d"});

		return {
			accessToken,
			refreshToken
		};
	},
	hashPassword: (password) => bcrypt.hash(password, 10)
};
