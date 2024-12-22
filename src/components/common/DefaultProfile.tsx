import { memo } from 'react';
import { cn } from '../../utils/utils';
import {
  LuVolleyball,
  LuPlane,
  LuPizza,
  LuFilm,
  LuMusic,
  LuBook,
  LuGamepad,
  LuCamera,
  LuBrush,
  LuRuler,
} from 'react-icons/lu';

const PROFILE_COLORS = [
  'bg-sky-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-violet-300',
  'bg-purple-300',
  'bg-fuchsia-300',
  'bg-pink-300',
  'bg-rose-300',
  'bg-red-300',
  'bg-orange-300',
  'bg-amber-300',
  'bg-yellow-300',
  'bg-lime-300',
  'bg-green-300',
  'bg-emerald-300',
  'bg-teal-300',
  'bg-cyan-300',
  'bg-sky-300',
];

const TOPIC_ICONS = {
  운동: LuVolleyball,
  독서: LuBook,
  음악: LuMusic,
  영화: LuFilm,
  요리: LuPizza,
  여행: LuPlane,
  게임: LuGamepad,
  사진: LuCamera,
  미술: LuBrush,
  기술: LuRuler,
} as const;

type TopicType = keyof typeof TOPIC_ICONS;

interface DefaultProfileProps {
  id: number;
  topic?: TopicType;
  className?: string;
}

const DefaultProfile = memo(({ id, topic, className }: DefaultProfileProps) => {
  const getBackgroundColor = (id: number) => {
    const index = Math.abs(id) % PROFILE_COLORS.length;
    return PROFILE_COLORS[index];
  };

  const Icon = topic ? TOPIC_ICONS[topic] : null;

  return (
    <div
      className={cn(
        getBackgroundColor(id),
        'flex h-10 w-10 items-center justify-center rounded-full opacity-50',
        className
      )}
    >
      {Icon ? <Icon className="h-6 w-6 text-white" aria-label={topic} /> : null}
    </div>
  );
});

DefaultProfile.displayName = 'DefaultProfile';

export default DefaultProfile;
