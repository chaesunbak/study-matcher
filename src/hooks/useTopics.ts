import { useState, useEffect } from 'react';
import { Topic } from '../models/topic.model';
import { getTopics } from '../api/topcis.api';

// TODO : 후에 리액트 쿼리를 활용하여 캐시
const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopics();
        setTopics(topics);
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
