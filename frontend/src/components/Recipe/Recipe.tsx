import {FC} from "react";
import {IRecipe} from "../../interfaces";

interface Iprops {
	recipe: IRecipe;
}

const Recipe: FC<Iprops> = ({recipe}) => {
	const {
		_id,
		category,
		creator,
		createdAt,
		gallery,
		description,
		kitchen,
		rating,
		ingredients,
		reviewsCount,
		bookCount,
		time,
		stages,
		title,
		servings
	} = recipe;

	return (
		<div>
			<div>
				<h2>_id</h2>: {_id}
			</div>
			<div>
				<h2>category</h2>: {category}
			</div>
			<div>
				<div>
					{creator._id}
				</div>
				<div>
					{creator.avatar}
				</div>
				<div>
					{creator.userName}
				</div>
			</div>
			<div>
				<h2>description</h2>: {description}
			</div>
			<div>
				<h2>createdAt</h2>: {createdAt}
			</div>
			<div>
				<h2>gallery</h2>:
				{gallery.map(media => <div key={media._id}>
					<div>{media.path}</div>
				</div>)}
			</div>
			<div>
				<h2>ingredients</h2>: {ingredients}
			</div>
			<div>
				<h2>kitchen</h2>: {kitchen}
			</div>
			<div>
				<h2>rating</h2>: {rating}
			</div>
			<div>
				<h2>reviewsCount</h2>: {reviewsCount}
			</div>
			<div>
				<h2>bookCount</h2>: {bookCount}
			</div>
			<div>
				<h2>time</h2>: {time}
			</div>
			<div>
				<h2>stages</h2>:
				{stages.map((stage) => <div key={stage._id}>
					<div>{stage.number}</div>
					<div>{stage.photo}</div>
					<div>{stage.description}</div>
				</div>)}
			</div>
			<div>
				<h2>title</h2>: {title}
			</div>
			<div>
				<h2>servings</h2>: {servings}
			</div>
		</div>
	);
};

export {Recipe};
