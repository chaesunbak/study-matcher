import { requestHandler } from './http';
import { Topic } from '../models/topic.model';

export const getTopics = async (): Promise<Topic[]> => {
  return await requestHandler<Topic[]>('get', '/topics');
};
