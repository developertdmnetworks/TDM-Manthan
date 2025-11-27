import { Mic2, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="px-8 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="text-white md:hidden">
            <Menu size={28} />
          </button>

          <div className="flex items-center gap-3">
            <Mic2 size={36} className="text-orange-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              TDM Manthan
            </h1>
          </div>

        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://open.spotify.com/show/YOUR_SHOW_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-colors font-medium text-sm md:text-base"
          >
            Listen on Spotify
          </a>
          <a
            href="https://podcasts.apple.com/podcast/YOUR_PODCAST_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors font-medium text-sm md:text-base"
          >
            Listen on Apple Music
          </a>
        </div>
      </div>
    </header>
  );
}
