import { Topic } from '../models/topic.model';
import { getMeetings } from '../api/meetings.api';
import { useState, useEffect } from 'react';
import { Meeting } from '../models/meeting.model';
import GroupSummary from './GroupSummary';

const TopicCarouselItem = ({ topic }: { topic: Topic }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getMeetings({ page: 1, topic_id: topic.id });
        setMeetings(response.meeting);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeetings();
  }, []);
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
