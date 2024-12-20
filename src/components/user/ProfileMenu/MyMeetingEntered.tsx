import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MeetingDetail, MeetingUser } from '../../../models/meeting.model';
import { requestHandlerUser } from '../../../api/usersApi/userHttp';
import { formatDate } from '../../../utils/format';

const MyMeetingEntered = () => {
  const navigate = useNavigate();

  const [userMeeting, setUserMeeting] = useState<MeetingDetail[]>([]);

  const getUserMeetings = async () => {
    try {
      const responseMeetingId = await requestHandlerUser('get', `/users/meetings`);
      const meetings = await Promise.all(
        responseMeetingId.data.meeting_users.map((meetingUser: MeetingUser) => getUser(meetingUser))
      );
      setUserMeeting(meetings);
    } catch (e) {
      console.error('Error getting meeting:', e);
    }
  };

  const getUser = async (meetingUser: MeetingUser) => {
    try {
      const response = await requestHandlerUser('get', `/meeting/${meetingUser.meeting_id}`);
      return response.data;
    } catch (e) {
      console.error('Error getting user:', e);
    }
  };

  useEffect(() => {
    getUserMeetings();
  }, []);

  return (
    <div className="rounded-lg border border-gray-700 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">내가 참여한 모임</h2>

        <Link
          className="font-normal text-gray-500 underline-offset-1 hover:underline"
          to={`/meeting`}
        >
          더보기 &gt;{' '}
        </Link>
      </div>

      {userMeeting.length > 0 ? (
        userMeeting.map((meeting) => (
          <div
            key={meeting.id}
            onClick={() => navigate(`/groups/${meeting.id}`)}
            className="hover:border-blue-500 mb-4 flex cursor-pointer items-center rounded-lg border bg-white p-4 shadow-md transition-all duration-300 hover:bg-gray-100"
          >
            <img
              src={`https://via.placeholder.com/150`}
              alt={meeting.title}
              className="mr-4 h-16 w-24 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
              <p className="mt-1 text-sm text-gray-600">
                생성 날짜: {formatDate(new Date(meeting.created_at))}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                참여자 수: {`${meeting.meeting_users.length}`}명
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
