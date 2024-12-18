import { useState, useEffect } from 'react';
import { requestHandler } from '../api/http';
import { Meeting } from '../models/meeting.model';

const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await requestHandler<Meeting[]>('get', '/meetings');
        setMeetings(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return { meetings, loading, error };
};

export default useMeetings;
