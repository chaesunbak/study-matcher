import { useOutletContext } from 'react-router';
import GroupMemberSection from '../components/groupdetail/GroupMemberSection';
import { MeetingDetail } from '../models/meeting.model';

interface GroupOutletContextProps {
  meeting: MeetingDetail;
}

const GroupMembers = () => {
  const { meeting } = useOutletContext<GroupOutletContextProps>();

  return (
    <div>
      <GroupMemberSection group={meeting} />
    </div>
  );
};

export default GroupMembers;
