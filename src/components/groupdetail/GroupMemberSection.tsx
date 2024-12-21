import { Link } from 'react-router';
import { useParams } from 'react-router';
import { MeetingDetail } from '../../models/meeting.model';
import { useUserStore } from '../../store/userStore';
import { deleteMeetingUser } from '../../api/meetings.api';

interface GroupMemberSectionProps {
  group: MeetingDetail;
  preview?: boolean;
}

const GroupMemberSection = ({ group, preview = false }: GroupMemberSectionProps) => {
  const { group_id } = useParams();
  const { user_info } = useUserStore();
  const isAdmin = user_info.sub === group.owner_user_id;

  // TODO : 현재 CORS 에러 후에 예외 처리를 추가합니다
  const handleDeleteMember = async (user_id: number) => {
    if (confirm('정말로 추방하시겠습니까?') === false) {
      return;
    }

    if (user_id === group.owner_user_id) {
      if (confirm('본인이 그룹의 방장입니다. 정말 스스로를 추방하시겠습니까?') === false) {
        return;
      }
      return;
    }

    await deleteMeetingUser(group.id, user_id).then((response) => {
      if (response.status === 200) {
        alert('멤버를 추방했습니다');
      } else {
        alert('멤버를 추방할 수 없습니다');
      }
    });
  };

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
            {isAdmin && (
              <div className="ml-auto flex items-center gap-2">
                <button
                  className="mr-2 text-red-500"
                  onClick={() => handleDeleteMember(member.user_id)}
                >
                  {member.user_id === group.owner_user_id ? '탈퇴' : '추방'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberSection;
