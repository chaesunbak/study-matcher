import { httpClient } from './http';
import { Topic } from '../models/topic.model';
import { Meeting } from '../models/meeting.model';

export interface MeetingResponse {
  meeting: Meeting[];
  total: number;
  currentPage: number;
  totalPage: number;
}

export interface getMeetingsParams {
  keyword?: string;
  page: number;
  topic_id?: Topic['id'];
  per_page: number;
  ongoingOnly?: boolean;
  availableOnly?: boolean;
}

export const getMeetings = async (params: getMeetingsParams): Promise<MeetingResponse> => {
  const response = await httpClient.get('/meeting', { params });
  return response.data;
};

export const getMeeting = async (id: number) => {
  const response = await httpClient.get(`/meeting/${id}`);
  return response;
};

export interface CreateMeetingParams {
  title: string;
  topic_id: number;
  description: string;
  max_members?: number;
  start_date?: string;
  end_date?: string;
}

export const createMeeting = async (params: CreateMeetingParams) => {
  const response = await httpClient.post('/meeting', params);
  return response;
};

export const joinMeeting = async (meetingId: number) => {
  const response = await httpClient.post(`/meeting/${meetingId}/participation`);
  return response;
};

export const deleteMeeting = async (meetingId: number) => {
  const response = await httpClient.delete(`/meeting/${meetingId}`);
  return response;
};

export const updateMeeting = async (meetingId: number, params: CreateMeetingParams) => {
  const response = await httpClient.put(`/meeting/${meetingId}`, params);
  return response;
};

export const deleteMeetingUser = async (meetingId: number, userId: number) => {
  const response = await httpClient.delete(`/meeting/${meetingId}/user`, {
    data: { user_id: userId },
  });

  return response;
};
