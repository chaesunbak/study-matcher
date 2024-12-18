import { MeetingDetail } from '../../models/meeting.model';
import Button from '../common/Button';
import { formatDate } from '../../utils/format';

const GroupDetailHeader = ({ group }: { group: MeetingDetail }) => {
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
      </div>
      <div>
        <p>{group.description}</p>
      </div>
      {/* TODO : 그룹에 이미 참여 한 경우 그룹의 설명은 보여주지 않습니다 */}
      <div className="flex flex-wrap items-center gap-2">
        {/* TODO : topic_id를 topic_name으로 변경합니다. */}
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`주제 : ${group.topic_id}`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`정원 : ${group.max_members}명`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`연령제한 : ${group.age_condition}`}
        </span>
        <span className="rounded-lg bg-slate-500 px-2 py-1 text-sm text-white">
          {`성별제한 : ${group.gender_condition}`}
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
      <Button onClick={() => alert(`${group.id} 그룹에 참여합니다.`)}>참가하기</Button>
      {/* TODO : 그룹에 참여하는 기능을 구현합니다. */}
      {/* TODO : 그룹에 이미 참여했다면 다른 버튼을 보여주거나 보여주지 않습니다. */}
    </div>
  );
};

export default GroupDetailHeader;
