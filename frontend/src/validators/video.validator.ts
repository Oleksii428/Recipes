import {fileUploadConfig} from "../configs";

const videoValidator = (video: File): string | undefined => {
	const {size, type, name} = video;

	if (!fileUploadConfig.VIDEO_MIMETYPES.includes(type)) {
		return `file ${name} has invalid format`;
	}

	if (size > fileUploadConfig.VIDEO_MAX_SIZE) {
		return `file ${name} too big. Max size: ${fileUploadConfig.VIDEO_MAX_SIZE / 1024 / 1024}mb`;
	}
};

export {videoValidator};
