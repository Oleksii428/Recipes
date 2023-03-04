import {IAuthor} from "./author.interface";

export interface IAuthors {
	authors: IAuthor[],
	page: string,
	count: number
}
