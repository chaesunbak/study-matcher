import { MeetingDetail } from '../../models/meeting.model';
import Button from '../common/Button';
import { formatDate } from '../../utils/format';

const GroupDetailHeader = ({ group }: { group: MeetingDetail }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="size-12 rounded-md bg-gray-200 transition-all" />
        <div className="flex flex-col justify-between">
          <h2>{group.title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-thin text-gray-500">
              멤버 {group.meeting_members.length}명
            </span>
            <span className="text-sm font-light text-gray-500">{`${formatDate(group.created_at)} 생성`}</span>
          </div>
        </div>
      </div>
      <div>
        <p>{group.description}</p>
      </div>
      {/* TODO : 그룹에 이미 참여 한 경우 그룹의 설명은 보여주지 않습니다 */}
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-slate-300 px-2 py-1 text-sm dark:bg-slate-800">
          {group.topic}
        </span>
        {/* TODO 여기에 연령제한 성별제한 등을 추가합니다 */}
      </div>
      <Button onClick={() => alert(`${group.id} 그룹에 참여합니다.`)}>참가하기</Button>
      {/* TODO : 그룹에 참여하는 기능을 구현합니다. */}
      {/* TODO : 그룹에 이미 참여했다면 다른 버튼을 보여주거나 보여주지 않습니다. */}
    </div>
  );
};

export default GroupDetailHeader;
