import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { VideoSection } from './components/VideoSection';
import { videosApi } from './api/videos';

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

        <div className="py-12">
          <VideoSection title="Most Watched" videos={mostWatchedVideos} />

          <VideoSection title="Older but Golden" videos={olderVideos} />

          {Object.entries(categorizedVideos).map(([category, videos]) => (
            <VideoSection key={category} title={category} videos={videos} />
          ))}
        </div>
      </main>

      <footer className="bg-black border-t border-gray-800 py-8 px-8 md:px-16">
        <div className="text-center text-gray-400">
          <p className="text-sm">© 2025 TDM Manthan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
