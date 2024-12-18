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

      try {
        const data = await getMeeting(id);
        setMeeting(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch meeting');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMeeting();
    } else {
      setMeeting(null);
      setLoading(false);
    }
  }, [id]);

  return { meeting, loading, error };
};

export default useMeeting;
