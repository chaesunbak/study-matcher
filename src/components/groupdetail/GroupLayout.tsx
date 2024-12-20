import GroupDetailHeader from './GroupDetailHeader';
import { Outlet } from 'react-router';
import useMeeting from '../../hooks/useMeeting';
import { useParams } from 'react-router';
import SkeletonGroupDetailHeader from '../skeleton/SkeletonGroupDetailHeader';
import SkeletonGroupMemberSection from '../skeleton/SkeletonGroupMemberSection';

const GroupLayout = () => {
  const { group_id } = useParams();

  const { meeting, loading, error } = useMeeting(Number(group_id));

  if (loading) {
    return (
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <SkeletonGroupDetailHeader />
        <div className="flex flex-col gap-4 md:col-span-2">
          <SkeletonGroupMemberSection />
          <SkeletonGroupMemberSection />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        에러가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        존재하지 않는 그룹입니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      <GroupDetailHeader group={meeting} />

      <div className="flex flex-col gap-4 md:col-span-2">
        <Outlet context={{ meeting }} />
      </div>
    </div>
  );
};

export default GroupLayout;
