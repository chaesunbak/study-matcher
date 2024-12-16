// import { useParams } from 'react-router';
import { useOutletContext } from 'react-router';
import GroupPostSection from '../components/groupdetail/GroupPostSection';
import { dummyPostings } from '../data';

interface ContextType {
  posts: typeof dummyPostings;
}

const PostList = () => {
  // const { group_id } = useParams();
  const { posts } = useOutletContext<ContextType>();
  return (
    <div>
      <GroupPostSection posts={posts} />
    </div>
  );
};

export default PostList;
