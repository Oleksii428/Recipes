import {fileUploadConfig} from "../configs";

const imageValidator = (image: File): string | undefined => {
	const {size, type, name} = image;

	if (!fileUploadConfig.IMAGE_MIMETYPES.includes(type)) {
		return `file ${name} has invalid format`;
	}

	if (size > fileUploadConfig.IMAGE_MAX_SIZE) {
		return `file ${name} too big. Max size: ${fileUploadConfig.IMAGE_MAX_SIZE / 1024 / 1024}mb`;
	}
};

export {imageValidator};
