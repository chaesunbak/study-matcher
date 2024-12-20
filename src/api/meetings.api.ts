import { httpClient } from './http';
import { Topic } from '../models/topic.model';
import { Meeting } from '../models/meeting.model';
import { requestHandler } from './http';

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
}

export const getMeetings = async (params: getMeetingsParams): Promise<MeetingResponse> => {
  const response = await httpClient.get('/meeting', { params });
  return response.data;
};

export const getMeeting = async (id: number) => {
  const response = await httpClient.get(`/meeting/${id}`);
  return response.data;
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
  const response = await requestHandler('post', '/meeting', params);
  return response.data;
};

export const joinMeeting = async (meetingId: number) => {
  const response = await httpClient.post(`/meeting/${meetingId}/participation`);
  return response.data;
};

export const deleteMeeting = async (meetingId: number) => {
  const response = await httpClient.delete(`/meeting/${meetingId}`);
  return response.data;
};

export const updateMeeting = async (meetingId: number, params: CreateMeetingParams) => {
  const response = await httpClient.put(`/meeting/${meetingId}`, params);
  return response.data;
};

export const deleteMeetingUser = async (meetingId: number, userId: number) => {
  const response = await httpClient.delete(`/meeting/${meetingId}/user`, {
    data: { user_id: userId },
  });
  return response.data;
};
