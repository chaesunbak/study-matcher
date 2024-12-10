import { useParams } from 'react-router';

const PostWrite = () => {
  const { group_id } = useParams();
  return (
    <div>
      <h1>{group_id}Write Post</h1>
    </div>
  );
};

export default PostWrite;
