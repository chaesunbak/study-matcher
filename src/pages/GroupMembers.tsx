// import { useParams } from 'react-router';
import { useOutletContext } from 'react-router';
import GroupMemberSection from '../components/groupdetail/GroupMemberSection';
import { dummyMeetingDetail } from '../data';

interface ContextType {
  group: typeof dummyMeetingDetail;
}

const GroupMembers = () => {
  // const { group_id } = useParams();
  const { group } = useOutletContext<ContextType>();

  return (
    <div>
      <GroupMemberSection group={group} />
    </div>
  );
};

export default GroupMembers;
