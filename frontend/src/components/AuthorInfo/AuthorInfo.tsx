import {FC} from "react";
import {IAuthor} from "../../interfaces";

interface IProps {
	author: IAuthor;
}

const AuthorInfo: FC<IProps> = ({author}) => {


	return (
		<h2>
			{author.userName}
		</h2>
	);
};

export {AuthorInfo};
