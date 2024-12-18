import { httpClient } from './http';
import { Topic } from '../models/topic.model';
import { Meeting, MeetingDetail } from '../models/meeting.model';

interface MeetingResponse {
  meeting: Meeting[];
  total: number;
  currentPage: number;
  totalPage: number;
}

export interface getMeetingsParams {
  keyword?: string;
  page: number;
  topic_id?: Topic['id'];
}

export const getMeetings = async (params: getMeetingsParams): Promise<MeetingResponse> => {
  const response = await httpClient.get('/meeting', { params });
  return response.data;
};

export const getMeeting = async (id: number): Promise<MeetingDetail> => {
  return await httpClient.get(`/meeting/${id}`);
};
