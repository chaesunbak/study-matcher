import { Meeting } from '../models/meeting.model';
import { Link } from 'react-router';
import { LuCalendar, LuUser } from 'react-icons/lu';

interface MeetingSummaryProps {
  meeting: Meeting;
}

const GroupSummary = ({ meeting }: MeetingSummaryProps) => {
  return (
    <Link to={`/groups/${meeting.id}`} className="flex items-center gap-4 transition-all">
      <div>
        <div className="size-20 rounded-xl bg-gray-200 transition-all md:size-24 md:rounded-2xl" />
        // TDOO: 현재는 스켈레톤을 띄우고 있으나 나중에 실제 이미지로 변경
        {/* <img src={meeting.imgUrl} alt={meeting.title} /> */}
      </div>
      <div className="flex h-full flex-col gap-2">
        <h3 className="hover:underline">{meeting.title}</h3>
        <p>{meeting.description}</p>
        <div className="flex items-center gap-2 text-sm font-thin text-gray-500">
          <span className="flex items-center gap-1">
            <LuCalendar />
            {new Date(meeting.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <LuUser />
            {15}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GroupSummary;
