import { useParams } from 'react-router';

const PostList = () => {
  const { group_id } = useParams();
  return (
    <div>
      <h1>{group_id} PostList</h1>
    </div>
  );
};

export default PostList;
