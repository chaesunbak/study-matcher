export interface Topic {
  id: number;
  name: TopicName;
}
type TopicName =
  | '운동'
  | '독서'
  | '음악'
  | '영화'
  | '요리'
  | '여행'
  | '게임'
  | '사진'
  | '미술'
  | '기술';
