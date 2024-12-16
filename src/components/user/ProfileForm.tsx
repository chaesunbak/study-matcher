import React, { useEffect, useState } from 'react';
import { User } from '../../models/user.model';
import MyMeeting from './\bProfileMenu/myMeeting';
import MyMeetingEntered from './\bProfileMenu/myMeetingEntered';
import { meetings, dummyUser, dummyPostingDetails } from '../../data';

interface ProfileProps {
  user_id: string | undefined;
}

const ProfileForm = ({ user_id }: ProfileProps) => {
  const [userData, setUserData] = useState<User | null>(null);

  // 왼쪽 메뉴 항목
  const menuItems = ['내프로필', '내가 참여한 모임', '내가 생성한 모임'];

  // 내 정보
  const securitySettings = [
    { label: '비밀번호', buttonLabel: '재설정', buttonClass: 'text-green-500' },
    { label: '개인정보', buttonLabel: '수정', buttonClass: 'text-green-500' },
  ];

  // localStorage에서 유저 데이터 가져오기
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
    <div className="bg-gray-50 flex min-h-screen">
      {/* 왼쪽 메뉴 */}
      <div className="w-1/4 bg-white shadow-md">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold">내프로필</h2>
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index} className="hover:text-green-500 cursor-pointer text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 px-6">
          <p className="text-gray-600">스마트봇 상담</p>
          <p className="mt-2 text-gray-600">회원등록</p>
        </div>
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="w-3/4 p-6">
        {/* 프로필 섹션 */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <img
              src={userData.profile_img || 'https://via.placeholder.com/80'}
              alt="프로필 이미지"
              className="mr-4 h-20 w-20 rounded-full bg-gray-300"
            />
            <div>
              <h3 className="text-2xl font-bold">{userData.introduction || '이름 없음'}</h3>
              <p className="text-gray-600">{userData.email}</p>
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
                <button className={item.buttonClass}>{item.buttonLabel}</button>
              </li>
            ))}
          </ul>
        </div>

        <MyMeeting user={dummyUser} />

        <MyMeetingEntered user={dummyUser} />
      </div>
    </div>
  );
};

export default ProfileForm;
