import { MeetingDetail } from '../../models/meeting.model';
import { Link } from 'react-router';
import { useParams } from 'react-router';

interface GroupMemberPreviewProps {
  group: MeetingDetail;
}

const GroupMemberPreview = ({ group }: GroupMemberPreviewProps) => {
  const { group_id } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>멤버 {group.meeting_members.length}</h3>
        <Link to={`/groups/${group_id}/members`}>더보기</Link>
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {group.meeting_members.map((member) => (
          <div key={member.id} className="flex items-center gap-2">
            <div className="size-12 rounded-full bg-gray-200 transition-all" />
            <div className="flex flex-col">
              <p>{member.email}</p>
              <p>{member.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberPreview;
