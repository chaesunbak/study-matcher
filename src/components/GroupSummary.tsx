import { Meeting } from '../models/meeting.model';
import { Link } from 'react-router';
import { LuCalendar, LuUser } from 'react-icons/lu';

interface MeetingSummaryProps {
  meeting: Meeting;
}

const GroupSummary = ({ meeting }: MeetingSummaryProps) => {
  return (
    <Link to={`/groups/${meeting.id}`} className="flex items-center gap-4">
      <div>
        <div className="size-20 rounded-xl bg-gray-200 transition-all md:size-24 md:rounded-2xl" />
        {/* <img src={meeting.imgUrl} alt={meeting.title} /> */}
      </div>
      <div className="flex h-full flex-col gap-2">
        <h3 className="font-semibold md:text-xl">{meeting.title}</h3>
        <p className="md:text-md text-sm font-thin lg:text-base">{meeting.description}</p>
        <div className="flex items-center justify-center text-sm font-thin">
          <span className="flex items-center text-gray-500">
            <LuCalendar />
            {meeting.created_at.toLocaleDateString()}
          </span>
          <span> • </span>
          <span className="flex items-center">
            <LuUser />
            {15}
          </span>
          <span> • </span>
          <span>{meeting.topic}</span>
        </div>
      </div>
    </Link>
  );
};

export default GroupSummary;
