import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { VideoSection } from './components/VideoSection';
import { videosApi } from './api/videos';
import logo from './assets/manthan logo png.png'; // 1. Import the logo image

function App() {
  const [recentVideos, setRecentVideos] = useState([]);
  const [mostWatchedVideos, setMostWatchedVideos] = useState([]);
  const [olderVideos, setOlderVideos] = useState([]);
  const [categorizedVideos, setCategorizedVideos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CACHE_KEY = 'tdm_manthan_videos';
        const CACHE_TIMESTAMP_KEY = 'tdm_manthan_videos_timestamp';
        const CACHE_DURATION = 24 * 60 * 60 * 1000;

        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cacheTimestamp) {
          const now = Date.now();
          const age = now - parseInt(cacheTimestamp, 10);

          if (age < CACHE_DURATION) {
            const parsed = JSON.parse(cachedData);
            setRecentVideos(parsed.recent);
            setMostWatchedVideos(parsed.mostWatched);
            setOlderVideos(parsed.older);
            setCategorizedVideos(parsed.categorized);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TIMESTAMP_KEY);
          }
        }

        const [recent, mostWatched, older, categorized] = await Promise.all([
          videosApi.getRecentVideos(5),
          videosApi.getMostWatchedVideos(10),
          videosApi.getOlderVideos(10),
          videosApi.getVideosByCategories(),
        ]);

        setRecentVideos(recent);
        setMostWatchedVideos(mostWatched);
        setOlderVideos(older);
        setCategorizedVideos(categorized);

        const dataToCache = {
          recent,
          mostWatched,
          older,
          categorized
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <BannerCarousel videos={recentVideos} />

        <div className="py-8 sm:py-10 md:py-12">
          <VideoSection title="Most Watched" videos={mostWatchedVideos} />

          <VideoSection title="Older but Golden" videos={olderVideos} />

          {Object.entries(categorizedVideos).map(([category, videos]) => (
            <VideoSection key={category} title={category} videos={videos} />
          ))}
        </div>
      </main>

      <footer className="bg-black border-t border-gray-800 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-300 space-y-3 sm:space-y-4">
            
            {/* 2. Added the logo image to the footer */}
            <img 
              src={logo} 
              alt="TDM Manthan Logo" 
              className="mx-auto h-12 mb-4" // Centered and sized logo for the footer
            />
            {/* -------------------------------------- */}
            
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              <span className="font-semibold text-white">TDM Manthan</span> (a unit of TDM Group) – A motivational podcast sharing real stories of India's unsung heroes, hosted by veteran journalist <span className="font-semibold text-white">Vatsala Shrangi</span>. Inspiring journeys of courage, resilience, and impact.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 pt-2 sm:pt-4">© 2025 TDM Manthan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;