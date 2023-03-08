const baseURL = "http://localhost:5000/";

const urls = {
	authors: "authors/",
	recipes: "recipes/",
	reviews: "reviews/",
	categories: "categories/",
	kitchens: "kitchens/",
	login: "auth/login",
	register: "authors",
	logout: "auth/logout",
	isLogin: "auth/isLogin",
	refresh: "auth/refresh/",
	forgotPass: "auth/password/forgot",
	restorePass: (token: string) => `auth/password/forgot?token=${token}`
};

export {
	baseURL,
	urls
};
