const regexp = {
	USERNAME: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
	EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
	PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
};

export {
	regexp
};
