import GroupMemberSection from '../components/groupdetail/GroupMemberSection';
import GroupPostSection from '../components/groupdetail/GroupPostSection';
import { useOutletContext } from 'react-router';
import { MeetingDetail } from '../models/meeting.model';

interface GroupOutletContextProps {
  meeting: MeetingDetail;
}

const GroupMain = () => {
  const { meeting } = useOutletContext<GroupOutletContextProps>();

  return (
    <>
      <GroupMemberSection group={meeting} preview />
      <GroupPostSection preview />
    </>
  );
};

export default GroupMain;
