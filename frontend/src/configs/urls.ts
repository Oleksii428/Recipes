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
	getAuthorById: (authorId: string) => `authors/getById/${authorId}`,
	getRecipesOfAuthor: (authorId: string) => `authors/${authorId}/recipes`,
	likeToggle: (authorId: string) => `/authors/${authorId}/like-toggle`,
	subscribeToggle: (authorId: string) => `/authors/${authorId}/subscribe-toggle`,
	createReview: (recipeId: string) => `/recipes/${recipeId}/addReview`,
	deleteReview: (reviewId: string) => `/reviews/${reviewId}`,
	reportAuthor: (authorId: string) => `/authors/${authorId}/complain`,
	blockAuthor: (authorId: string) => `/authors/${authorId}/block`,
	uploadAvatar: "/authors/upload-avatar",
	changeUserName: "/authors/userName"
};

export {
	baseURL,
	urls
};
