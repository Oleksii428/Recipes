const fileUploadConfig = {
	IMAGE_MIMETYPES: [
		"image/jpeg",
		"image/png",
		"image/webp"
	],
	IMAGE_MAX_SIZE: 5 * 1024 * 1024,

	VIDEO_MIMETYPES: [
		"video/mp4",
		"video/webm"
	],
	VIDEO_MAX_SIZE: 60 * 1024 * 1024
};

export {fileUploadConfig};
