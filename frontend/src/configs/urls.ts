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
	restorePass: (token: string) => `auth/password/forgot?token=${token}`,
	getAuthorById: (id: string) => `authors/${id}/`,
	getRecipesOfAuthor: (id: string) => `authors/${id}/recipes`,
	likeToggle: (id: string) => `/authors/${id}/like-toggle`,
	subscribeToggle: (id: string) => `/authors/${id}/subscribe-toggle`,
	createReview: (id: string) => `/recipes/${id}/addReview`
};

export {
	baseURL,
	urls
};
