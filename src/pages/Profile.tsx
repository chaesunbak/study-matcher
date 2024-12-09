import { useParams } from "react-router";

const Profile = () => {
	const { user_id } = useParams();
	return (
		<div>
			<h1>{user_id} :Profile</h1>
		</div>
	);
};

export default Profile;
