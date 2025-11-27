import { Menu } from 'lucide-react';
import logo from '../assets/manthan logo png.png'; // 1. Import the logo image

export function Header() {
  return (
    <header>
      <div className="px-8 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="text-white md:hidden">
            <Menu size={28} />
          </button>

          {/* 2. Replaced existing Mic2 icon and h1 with the new logo image */}
          <div className="flex items-center"> 
            <img 
              src={logo} 
              alt="Manthan Logo" 
              className="h-16 md:h-16" // Add appropriate Tailwind CSS classes for size
            />
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