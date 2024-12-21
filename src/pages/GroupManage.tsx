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
import Input from '../components/user/InputForm';
import { groupCreateSchema, GroupCreateForm } from './GroupCreate';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMeeting } from '../api/meetings.api';
import useTopics from '../hooks/useTopics';
import { z } from 'zod';
import { useUserStore } from '../store/userStore';
import ErrorComponent from '../components/common/ErrorComponent';
import { formatDateYyyyMmDd } from '../utils/format';

const GroupManage = () => {
  const { group_id } = useParams();
  const { meeting } = useOutletContext<{ meeting: MeetingDetail }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupCreateSchema),
  });
  const { topics } = useTopics();
  const { user_info } = useUserStore();

  if (meeting.owner_user_id !== user_info.sub) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ErrorComponent message="권한이 없습니다." />
      </div>
    );
  }

  //TODO: 에러처리를 추가합니다
  const onSubmit = async (data: GroupFormData) => {
    const params: GroupCreateForm = {
      title: data.title,
      topic_id: parseInt(data.topic_id),
      description: data.description,
    };

    if (data.max_members) {
      params.max_members = parseInt(data.max_members);
    }
    if (data.start_date) {
      params.start_date = data.start_date;
    }
    if (data.end_date) {
      params.end_date = data.end_date;
    }

    setLoading(true);
    await updateMeeting(Number(group_id), params)
      .then((response) => {
        if (response.status === 200) {
          alert('그룹을 수정했습니다.');
          navigate(`/groups/${group_id}`);
        } else if (response.status === 401 || response.status === 403) {
          alert('권한이 없습니다.');
        } else {
          console.error(response);
          alert('그룹을 수정에 실패했습니다.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  type GroupFormData = z.infer<typeof groupCreateSchema>;

  // TODO : 에러처리를 추가합니다
  const handleDeleteMeeting = async () => {
    setLoading(true);
    if (confirm('정말 그룹을 삭제하시겠습니까?') === false) {
      setLoading(false);
      return;
    }
    await deleteMeeting(Number(group_id))
      .then((response) => {
        if (response.status === 200) {
          alert('그룹을 삭제했습니다.');
          navigate('/');
        } else if (response.status === 401 || response.status === 403) {
          alert('권한이 없습니다.');
        } else {
          console.error(response);
          alert('그룹을 삭제에 실패했습니다');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger>
          <Button className="w-20">그룹 수정</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>그룹 수정</DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex max-h-96 flex-col gap-4 overflow-y-scroll"
              >
                <label htmlFor="title">모임 이름(필수)</label>
                <Input
                  name="title"
                  type="text"
                  placeholder="모임 이름를 입력해주세요."
                  defaultValue={meeting.title}
                  control={control}
                  errors={errors}
                />
                <label htmlFor="topic_id">카테고리(필수)</label>
                <Input
                  name="topic_id"
                  type="select"
                  placeholder="카테고리를 선택해주세요."
                  defaultValue={meeting.topic.id.toString()}
                  control={control}
                  errors={errors}
                  options={topics.map((topic) => ({
                    value: topic.id.toString(),
                    label: topic.name,
                  }))}
                />
                <label htmlFor="description">모임 설명(필수)</label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="모임 설명을 입력해주세요."
                  defaultValue={meeting.description}
                  control={control}
                  errors={errors}
                />
                <label htmlFor="max_members">정원(선택)</label>
                <Input
                  name="max_members"
                  type="number"
                  placeholder="정원을 입력해주세요.(선택)"
                  defaultValue={String(meeting.max_members)}
                  control={control}
                  errors={errors}
                />
                <label htmlFor="start_date">시작일(선택)</label>
                <Input
                  name="start_date"
                  type="text"
                  placeholder="YYYY-MM-DD 형식으로 시작일을 입력해주세요.(선택)"
                  defaultValue={formatDateYyyyMmDd(meeting.start_date)}
                  control={control}
                  errors={errors}
                />
                <label htmlFor="end_date">종료일(선택)</label>
                <Input
                  name="end_date"
                  type="text"
                  placeholder="YYYY-MM-DD 형식으로 종료일을 입력해주세요.(선택)"
                  defaultValue={formatDateYyyyMmDd(meeting.end_date)}
                  control={control}
                  errors={errors}
                />

                <Button className="mb-4 w-full" type="submit" disabled={loading}>
                  그룹 정보 수정하기
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button onClick={handleDeleteMeeting} disabled={loading} className="w-20">
        그룹 삭제
      </Button>
    </div>
  );
};

export default GroupManage;
