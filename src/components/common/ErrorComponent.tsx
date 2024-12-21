import { LuHouse, LuBadgeAlert } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import Button from './Button';

const ErrorComponent = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <LuBadgeAlert className="h-16 w-16 text-red-500" />
      <h2>{message}</h2>
      <Button
        onClick={() => navigate('/')}
        className="mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
      >
        <LuHouse className="h-5 w-5" />
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default ErrorComponent;
