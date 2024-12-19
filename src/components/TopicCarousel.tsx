import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useTopics from '../hooks/useTopics';
import TopicCarouselItem from './TopicCarouselItem';
const TopicCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const { topics } = useTopics();

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  // TODO: 보이는 캐러샐의 데이터만 불러오는 등의 최적화가 필요합니다.
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {topics.map((topic) => (
          <TopicCarouselItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default TopicCarousel;
