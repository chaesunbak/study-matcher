import { useState, useEffect } from 'react';
import { MeetingDetail } from '../models/meeting.model';
import { getMeeting } from '../api/meetings.api';

const useMeeting = (id: number) => {
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      setLoading(true);
      setError(null);

      await getMeeting(id)
        .then((response) => {
          if (response.status === 200) {
            setMeeting(response.data);
          } else if (response.status === 404) {
            setMeeting(null);
            setError('존재하지 않는 그룹입니다');
          } else {
            setError('그룹을 불러오는 중에 오류가 발생했습니다.');
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMeeting();
  }, [id]);

  return { meeting, loading, error };
};

export default useMeeting;
