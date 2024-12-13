// import { useParams } from 'react-router';
import GroupDetailHeader from '../components/groupdetail/GroupDetailHeader';
import GroupMemberPreview from '../components/groupdetail/GroupMemberPreview';
import { dummyMeetingDetail, dummyPostings } from '../data';
import GroupPostPreview from '../components/groupdetail/GroupPostPreview';

const GroupMain = () => {
  const group = dummyMeetingDetail;
  const posts = dummyPostings;
  // const { group_id } = useParams();
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      <GroupDetailHeader group={group} />
      <div className="flex flex-col gap-4 md:col-span-2">
        <GroupMemberPreview group={group} />
        <GroupPostPreview posts={posts} />
      </div>
    </div>
  );
};

export default GroupMain;
