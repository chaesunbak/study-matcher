import { useParams } from "react-router";

const GroupMembers = () => {
	const { group_id } = useParams();
	return (
		<div>
			<h1>{group_id} : Group Members</h1>
		</div>
	);
};

export default GroupMembers;
