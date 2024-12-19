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
