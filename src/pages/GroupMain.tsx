import GroupMemberPreview from '../components/groupdetail/GroupMemberPreview';
import GroupPostPreview from '../components/groupdetail/GroupPostPreview';
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
      <GroupMemberPreview group={group} />
      <GroupPostPreview posts={posts} />
    </>
  );
};

export default GroupMain;
