import { Link } from 'react-router';
import { useParams } from 'react-router';
import { MeetingDetail } from '../../models/meeting.model';

interface GroupMemberSectionProps {
  group: MeetingDetail;
  preview?: boolean;
}

const GroupMemberSection = ({ group, preview = false }: GroupMemberSectionProps) => {
  const { group_id } = useParams();

  const membersToShow = preview ? group.meeting_users.slice(0, 4) : group.meeting_users;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>멤버 {group.meeting_users.length}</h3>

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
            {/* <img
              className="size-12 rounded-full"
              src={member.user.profile_img}
              alt={`${member.user.username}의 프로필 이미지`}
            /> */}
            <div className="flex flex-col">
              <span>{member.user.username}</span>
              <span>{member.user.introduction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberSection;
