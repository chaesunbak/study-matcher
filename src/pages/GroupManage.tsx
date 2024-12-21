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

const GroupManage = () => {
  const { group_id } = useParams();
  const { meeting } = useOutletContext<{ meeting: MeetingDetail }>();
  console.log(meeting);

  // TODO : 에러처리를 추가합니다
  const handleDeleteMeeting = async () => {
    await deleteMeeting(Number(group_id))
      .then((response) => {
        if (response.status === 204) {
          if (confirm('정말 그룹을 삭제하시겠습니까?')) {
            alert('그룹이 삭제되었습니다.');
          } else {
            alert('그룹을 삭제할 수 없습니다.');
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Button>그룹 멤버 관리</Button>
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

      <Button onClick={handleDeleteMeeting}>그룹 삭제</Button>
    </div>
  );
};

export default GroupManage;
