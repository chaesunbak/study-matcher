import GroupMemberPreview from '../components/groupdetail/GroupMemberSection';
import GroupPostPreview from '../components/groupdetail/GroupPostSection';
import { useOutletContext } from 'react-router';
import { dummyMeetingDetail, dummyPostings } from '../data';

interface ContextType {
  group: typeof dummyMeetingDetail;
  posts: typeof dummyPostings;
}

const GroupMain = () => {
  const { group, posts } = useOutletContext<ContextType>();

  return (
    <>
      <GroupMemberPreview group={group} preview />
      <GroupPostPreview posts={posts} preview />
    </>
  );
};

export default GroupMain;
