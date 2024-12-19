import { UserResponse } from '../../../models/user.model';
import { Link } from 'react-router-dom';

interface MyMeetingProps {
  user: UserResponse;
}

const MyMeeting = ({ user }: MyMeetingProps) => {
  // const navigate = useNavigate();

  // const createdMeetings: MeetingDetail[] = dummyMeetingDetails.filter(
  //   (meeting) => meeting.owner_user_id === user.id
  // );

  return (
    <div className="relative p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">내가 생성한 모임</h2>

        <Link
          className="font-normal text-gray-500 underline-offset-1 hover:underline"
          to={`/manage/${user.id}`}
        >
          더보기 &gt;{' '}
        </Link>
      </div>

      {/* {createdMeetings.length > 0 ? (
        createdMeetings.map((meeting) => {
          // 작성한 게시글 개수
          const userPosts: number = dummyPostings.filter(
            (post) => post.meeting_id === meeting.id
          ).length;

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
                  생성 날짜: {formatDate(meeting.created_at)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  종료 날짜: {formatDate(meeting.end_date)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  전체 멤버 수: {meeting.meeting_members.length}
                </p>
                <p className="mt-1 text-sm text-gray-600">전체 게시글 수: {userPosts}개</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">생성한 모임이 없습니다.</p>
      )} */}
    </div>
  );
};

export default MyMeeting;
