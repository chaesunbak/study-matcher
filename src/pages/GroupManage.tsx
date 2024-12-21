import { useParams } from 'react-router';
import Button from '../components/common/Button';
import { deleteMeeting } from '../api/meetings.api';
import { useOutletContext } from 'react-router';
import { MeetingDetail } from '../models/meeting.model';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/common/Dialog';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const GroupManage = () => {
  const { group_id } = useParams();
  const { meeting } = useOutletContext<{ meeting: MeetingDetail }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(meeting);

  // TODO : 에러처리를 추가합니다
  const handleDeleteMeeting = async () => {
    setLoading(true);
    if (confirm('정말 그룹을 삭제하시겠습니까?') === false) {
      return;
    }
    await deleteMeeting(Number(group_id))
      .then((response) => {
        if (response.status === 204) {
          alert('그룹을 삭제했습니다.');
          navigate('/');
        } else {
          console.error(response);
          alert('그룹을 삭제에 실패했습니다.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>그룹 수정</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>그룹 수정</DialogTitle>
            <DialogDescription>
              이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되고 데이터가 제거됩니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button onClick={handleDeleteMeeting} disabled={loading}>
        그룹 삭제
      </Button>
    </div>
  );
};

export default GroupManage;
