import { useEffect, useState } from 'react';
import { User } from '../../../models/user.model';
// import MyMeeting from './MyMeeting';
// import MyMeetingEntered from './MyMeetingEntered';
import { Link } from 'react-router';

interface ProfileProps {
  user_id: string | undefined;
}

const ProfileForm = ({ user_id }: ProfileProps) => {
  const [userData, setUserData] = useState<User | null>(null);

  const securitySettings = [
    {
      label: '비밀번호',
      buttonLabel: '재설정',
      buttonClass: 'text-green-500',
      link: 'reset-password',
    },
    { label: '개인정보', buttonLabel: '수정', buttonClass: 'text-green-500', link: 'modify' },
  ];

  // 현재 localStorage -> API로 변경
  //user_id를 통해 axios로 해당 user_id에 대한 데이터 요청
  useEffect(() => {
    if (!user_id) return;

    const storedData = localStorage.getItem('register');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserData(parsedData.newUser);
    }
  }, [user_id]);

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        사용자 데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center">
          <img
            src={userData.profile_img || 'https://via.placeholder.com/80'}
            alt="프로필 이미지"
            className="mr-4 h-20 w-20 rounded-full bg-gray-300"
          />
          <div>
            <h3 className="text-2xl font-bold">{userData.email || '이름 없음'}</h3>
            <p className="text-gray-600">{userData.introduction}</p>
          </div>
        </div>
      </div>

      {/* 내 정보 */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">내 정보</h3>
        <ul className="space-y-4">
          {securitySettings.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item.label}</span>
              <Link to={`/users/${userData.email}/${item.link}`} className={item.buttonClass}>
                {item.buttonLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* <MyMeeting user={dummyUser} />

      <MyMeetingEntered user={dummyUser} /> */}
    </div>
  );
};

export default ProfileForm;
