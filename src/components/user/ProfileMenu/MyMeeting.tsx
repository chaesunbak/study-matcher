import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestHandlerUser } from '../../../api/usersApi/userHttp';
import { useUserStore } from '../../../store/userStore';
import { Meeting } from '../../../models/meeting.model';
import { formatDate } from '../../../utils/format';

const MyMeeting = () => {
  const navigate = useNavigate();
  const { sub } = useUserStore((state) => state.user_info);
  const [userMeeting, setUserMeeting] = useState<Meeting[]>([]);

  const getUserMeetings = async () => {
    try {
      const response = await requestHandlerUser('get', `/users/${sub}/meeting`);
      setUserMeeting(response.data.meetings);
    } catch (e) {
      console.error('Error getting meeting:', e);
    }
  };

  useEffect(() => {
    getUserMeetings();
  }, []);

  return (
    <div className="relative mb-6 rounded-lg border border-slate-500 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">내가 생성한 모임</h2>

        {/* <Link
          className="font-normal text-gray-500 underline-offset-1 hover:underline"
          to={`/manage/0`}
        >
          더보기
        </Link> */}
      </div>

      {userMeeting.length > 0 ? (
        userMeeting.map((meeting) => {
          return (
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
                <h3 className="text-lg font-medium">{meeting.title}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  생성 날짜: {formatDate(new Date(meeting.created_at))}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  종료 날짜: {formatDate(new Date(meeting.end_date))}
                </p>
                <p className="mt-1 text-sm text-gray-600">정원: {meeting.max_members}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">생성한 모임이 없습니다.</p>
      )}
    </div>
  );
};

export default MyMeeting;
