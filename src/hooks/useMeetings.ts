import { useState, useEffect } from 'react';
import { Meeting } from '../models/meeting.model';
import { getMeetings } from '../api/meetings.api';
import { useSearchParams } from 'react-router';
import { getMeetingsParams } from '../api/meetings.api';

const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError(null);

      const keyword = searchParams.get('keyword');
      const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
      const topicId = searchParams.get('topic');
      const params: getMeetingsParams = { page };

      if (keyword) {
        params.keyword = keyword;
      }

      if (topicId) {
        params.topic_id = parseInt(topicId, 10);
      }

      try {
        const response = await getMeetings(params);
        setMeetings(response.meeting);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [searchParams]);

  return { meetings, loading, error };
};

export default useMeetings;
