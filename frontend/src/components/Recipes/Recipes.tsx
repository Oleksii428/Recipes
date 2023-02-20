import {FC, useEffect, useState} from "react";

import {IRecipes} from "../../interfaces";
import {recipeService} from "../../services";
import {Recipe} from "../Recipe/Recipe";

const Recipes: FC = () => {
	const [list, setList] = useState<IRecipes>();

	useEffect(() => {
		recipeService.getByQuery().then(({data}) => setList(data));
	}, []);

	return (
		<div>
			<div>
				{list?.recipes.map(recipe => <Recipe recipe={recipe} key={recipe._id} />)}
			</div>
			<br />
			<div>
				Page: {list?.page}
			</div>
		</div>
	);
};

export {Recipes};
