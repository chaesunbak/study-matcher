// import { useParams } from 'react-router';
import { useOutletContext } from 'react-router';
import GroupPostSection from '../components/groupdetail/GroupPostSection';
import { dummyPosts } from '../data';

interface ContextType {
  posts: typeof dummyPosts;
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
