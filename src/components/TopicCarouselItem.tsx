import { Topic } from '../models/topic.model';
import { getMeetings } from '../api/meetings.api';
import { useState, useEffect } from 'react';
import { Meeting } from '../models/meeting.model';
import GroupSummary from './GroupSummary';
import SkeletonGroupSummary from './skeleton/SkeletonGroupSummary';

const TopicCarouselItem = ({ topic }: { topic: Topic }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      await getMeetings({ topic_id: topic.id, page: 1, per_page: 5 })
        .then((data) => {
          setMeetings(data.meeting);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div
        className="flex min-w-0 flex-col gap-4"
        style={{
          flex: '0 0 100%',
        }}
      >
        <h2>{topic.name}</h2>
        <div className="flex min-w-0 flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonGroupSummary key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex min-w-0 flex-col gap-4"
        style={{
          flex: '0 0 100%',
        }}
      >
        <h2>{topic.name}</h2>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="text-red-500">에러가 발생했습니다: {error}</div>;
        </div>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div
        className="flex min-w-0 flex-col gap-4"
        style={{
          flex: '0 0 100%',
        }}
      >
        <h2>{topic.name}</h2>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="text-gray-500">데이터가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-w-0 flex-col gap-4"
      style={{
        flex: '0 0 100%',
      }}
    >
      <h2>{topic.name}</h2>
      <div className="flex flex-col gap-4">
        {meetings.map((meeting) => (
          <GroupSummary key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default TopicCarouselItem;
