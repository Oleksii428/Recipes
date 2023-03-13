import {ChangeEvent, FC, useLayoutEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

interface Iprops {
	count: number;
}

const MyPagination: FC<Iprops> = ({count}) => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [page, setPage] = useState<string>("1");

	useLayoutEffect(() => {
		const pageInQuery: string | null = query.get("page");
		if (pageInQuery) {
			setPage(pageInQuery);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: ChangeEvent<unknown>, page: number) => {
		const newPage = page.toString();
		setPage(newPage);
		query.set("page", newPage);
		navigate({search: query.toString()});
	};

	return (
		<Pagination
			sx={{display: "flex", justifyContent: "center"}}
			size="large"
			defaultValue={page}
			onChange={handleChange}
			count={Math.ceil(count / 8)}
			variant="outlined"
			shape="rounded"
		/>
	);
};

export {MyPagination};
