import { Meeting } from '../models/meeting.model';
import { Link } from 'react-router';
import { LuCalendar, LuUser } from 'react-icons/lu';
import DefaultProfile from './common/DefaultProfile';

interface MeetingSummaryProps {
  meeting: Meeting;
}

const GroupSummary = ({ meeting }: MeetingSummaryProps) => {
  return (
    <Link
      to={`/groups/${meeting.id}`}
      className="flex items-center gap-2 transition-all hover:opacity-90 md:gap-4"
    >
      <div>
        <DefaultProfile
          id={meeting.id}
          className="size-20 rounded-xl transition-all md:size-24 md:rounded-2xl"
          topic={meeting.topic.name}
        />
        {/* TDOO: 현재는 스켈레톤을 띄우고 있으나 나중에 실제 이미지로 변경 */}
        {/* <img src={meeting.imgUrl} alt={meeting.title} /> */}
      </div>
      <div className="flex h-full flex-col items-start justify-between">
        <h3 className="hover:underline">{meeting.title}</h3>
        <p className="w-48 truncate md:w-72 lg:w-80 xl:w-96">{meeting.description}</p>
        <div className="flex flex-wrap items-center gap-1 text-xs font-thin text-gray-500 md:gap-2 md:text-sm">
          <span className="flex items-center gap-1">
            <LuCalendar />
            생성 {new Date(meeting.created_at).toLocaleDateString()}
          </span>
          {meeting.max_members && (
            <span className="flex items-center gap-1">
              <LuUser />
              정원 {meeting.max_members}명
            </span>
          )}
          {meeting.start_date && (
            <span className="flex items-center gap-1">
              <LuCalendar />
              시작 {new Date(meeting.start_date).toLocaleDateString()}
            </span>
          )}
          {meeting.end_date && (
            <span className="flex items-center gap-1">
              <LuCalendar />
              종료 {new Date(meeting.end_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GroupSummary;
