import GroupMemberSection from '../components/groupdetail/GroupMemberSection';
import GroupPostSection from '../components/groupdetail/GroupPostSection';
import { useOutletContext } from 'react-router';
import { dummyMeetingDetail, dummyPosts } from '../data';

interface ContextType {
  group: typeof dummyMeetingDetail;
  posts: typeof dummyPosts;
}

const GroupMain = () => {
  const { group, posts } = useOutletContext<ContextType>();

  return (
    <>
      <GroupMemberSection group={group} preview />
      <GroupPostSection posts={posts} preview />
    </>
  );
};

export default GroupMain;
