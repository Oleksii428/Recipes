import {IAuthor} from "../author.interface";

export interface ITokenData {
	accessToken: string;
	refreshToken: string;
	author: IAuthor;
}
