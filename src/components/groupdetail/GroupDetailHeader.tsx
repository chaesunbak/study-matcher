import { MeetingDetail } from '../../models/meeting.model';
import Button from '../common/Button';
import { formatDate } from '../../utils/format';
import { joinMeeting } from '../../api/meetings.api';
import { useNavigate, Link } from 'react-router';
import { LuSettings } from 'react-icons/lu';
import { useUserStore } from '../../store/userStore';

const GroupDetailHeader = ({ group }: { group: MeetingDetail }) => {
  const navigate = useNavigate();
  const { user_info } = useUserStore();

  // TODO : 에러처리를 추가합니다
  const handleParticipation = async () => {
    await joinMeeting(group.id).then((response) => {
      if (response.status === 201) {
        alert(`${group.title} 그룹에 참여했습니다`);
      } else {
        alert('그룹에 참여할 수 없습니다.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="size-12 rounded-md bg-gray-200 transition-all" />
        {/* TODO : 그룹의 이미지를 보여줍니다. */}
        {/* TODO : 이미지가 없는 경우 기본 이미지를 보여줍니다. */}
        {/* <img className='size-12 rounded-md'/> */}
        <div className="flex flex-col justify-between">
          <h2>{group.title}</h2>
          <div className="flex items-center gap-2 text-sm font-normal">
            <span>멤버 {group.meeting_users.length}명</span>
            <span>{`${formatDate(new Date(group.created_at))} 생성`}</span>
          </div>
        </div>
        {user_info.sub === group.owner_user_id && (
          <div className="m flex items-center gap-2">
            <Link
              to={`/groups/${group.id}/manage`}
              className="flex items-center gap-2 hover:underline"
            >
              <LuSettings />
              <span>관리</span>
            </Link>
          </div>
        )}
      </div>
      <div>
        <p>{group.description}</p>
      </div>
      {/* TODO : 그룹에 이미 참여 한 경우 그룹의 설명은 보여주지 않습니다 */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 용이한 테스트를 위해서 아래정보를 보여주고 있습니다 */}
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`주제 : ${group.topic.name}`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`정원 : ${group.max_members}명`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`시작일 : ${new Date(group.start_date).toLocaleDateString()}`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`종료일 : ${new Date(group.end_date).toLocaleDateString()}`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`방장 ID : ${group.owner_user_id}`}
        </span>
      </div>
      {group.participation ? (
        <Button
          onClick={() => {
            navigate(`/groups/${group.id}/posts/write`);
          }}
        >
          글 쓰기
        </Button>
      ) : (
        <Button onClick={handleParticipation}>참가하기</Button>
      )}
    </div>
  );
};

export default GroupDetailHeader;
