import { MeetingDetail } from '../../models/meeting.model';
import { Link } from 'react-router';
import { useParams } from 'react-router';

interface GroupMemberSectionProps {
  group: MeetingDetail;
  preview?: boolean;
}

const GroupMemberSection = ({ group, preview = false }: GroupMemberSectionProps) => {
  const { group_id } = useParams();
  const membersToShow = preview ? group.meeting_members.slice(0, 4) : group.meeting_members;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>멤버 {group.meeting_members.length}</h3>

        {preview && (
          <Link
            className="font-normal text-gray-500 underline-offset-1 hover:underline"
            to={`/groups/${group_id}/members`}
          >
            더보기 &gt;{' '}
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {membersToShow.map((member) => (
          <div key={member.id} className="flex items-center gap-2">
            <div className="size-12 rounded-full bg-gray-200 transition-all" />
            <div className="flex flex-col">
              <p>{member.email}</p> {/* TODO : 이메일 대신 닉네임을 표시합니다. */}
              <p>{member.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberSection;
