import { MeetingDetail } from '../../models/meeting.model';

const GroupDetailHeader = ({ group }: { group: MeetingDetail }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start gap-2">
        <div className="size-12 rounded-md bg-gray-200 transition-all" />
        <div className="flex flex-col justify-between">
          <h2>{group.title}</h2>
          <div>
            <span>{group.meeting_members.length}명</span>
          </div>
        </div>
      </div>
      <div>
        <p>{group.description}</p>
        <div className="flex">
          <div>{group.topic}</div> <div>{group.age_condition}</div>{' '}
          <div>{group.gender_condition}</div>
        </div>
      </div>
      <button className="rounded-lg bg-orange-500 p-2 font-semibold text-white">참여하기</button>
    </div>
  );
};

export default GroupDetailHeader;
