import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';

export function BannerCarousel({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentIndex];

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentVideo.thumbnail_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl">
        <div className="max-w-2xl z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl leading-tight">
            {currentVideo.title}
          </h1>

          <div className="flex items-center gap-2 sm:gap-4 text-white mb-4 md:mb-6 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2 bg-orange-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium">{formatViews(currentVideo.views)} views</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <span className="font-medium">{currentVideo.duration}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 drop-shadow-lg">
            {currentVideo.description}
          </p>

          <button
            onClick={() => window.open(currentVideo.video_url, '_blank')}
            className="flex items-center gap-2 sm:gap-3 bg-orange-600 hover:bg-orange-700 text-white px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Play size={20} fill="white" className="sm:w-[24px] sm:h-[24px]" />
            Watch Now
          </button>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        aria-label="Previous"
      >
        <ChevronLeft size={24} className="sm:w-[32px] sm:h-[32px]" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        aria-label="Next"
      >
        <ChevronRight size={24} className="sm:w-[32px] sm:h-[32px]" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-orange-600 w-8 sm:w-12 h-2 sm:h-3'
                : 'bg-white/50 hover:bg-white/80 w-2 sm:w-3 h-2 sm:h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
