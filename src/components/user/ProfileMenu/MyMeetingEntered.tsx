import { User } from '../../../models/user.model';
import { MeetingDetail } from '../../../models/meeting.model';
import { dummyMeetingDetail } from '../../../data';
import { formatDate } from '../../../utils/format';

interface MyMeetingEnteredProps {
  user: User;
}

const MyMeetingEntered = ({ user }: MyMeetingEnteredProps) => {
  // 내가 참여한 모임 필터링
  const enteredMeetings: MeetingDetail[] = dummyMeetingDetail.filter((meeting) =>
    meeting.meeting_members.some((member) => member.id === user.id)
  );

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">내가 참여한 모임</h2>
      {enteredMeetings.length > 0 ? (
        enteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="mb-4 flex items-center rounded-lg border bg-white p-4 shadow"
          >
            {/* 이미지 */}
            <img
              src={`https://via.placeholder.com/150`}
              alt={meeting.title}
              className="mr-4 h-16 w-24 rounded-lg object-cover"
            />

            {/* 모임 정보 */}
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
              <p className="mt-1 text-sm text-gray-600">
                생성 날짜: {formatDate(meeting.created_at)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                참여자 수: {meeting.meeting_members.length}명
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-50 flex h-32 items-center justify-center rounded-lg">
          <p className="text-gray-600">참여한 모임이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyMeetingEntered;
