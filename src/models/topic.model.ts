export interface Topic {
  id: number;
  name: TopicName;
}
type TopicName =
  | '운동'
  | '자기계발'
  | '동네친구'
  | '아웃도어/여행'
  | '가족/육아'
  | '반려동물'
  | '음식/음료'
  | '취미/오락'
  | '독서/인문학'
  | '문화/예술'
  | '음악/악기'
  | '기타';
