import { useParams } from "react-router";

const PostDetail = () => {
	const { group_id, post_id } = useParams();
	return (
		<div>
			<h1>
				{group_id} {post_id}Post Detail
			</h1>
		</div>
	);
};

export default PostDetail;
