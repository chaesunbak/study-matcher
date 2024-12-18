import { useState, useEffect } from 'react';
import { requestHandler } from '../api/http';
import { Topic } from '../models/topic.model';

const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await requestHandler<Topic[]>('get', '/topics');
        setTopics(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { topics, loading, error };
};

export default useTopics;
