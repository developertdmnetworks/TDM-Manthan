import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/manthan logo png.png'; // 1. Import the logo image

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* 2. Replaced the Mic2 icon and h1 text with the image logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="TDM Manthan Logo" 
              className="h-8 md:h-10 lg:h-12" // Tailwind classes for logo size
            />
          </div>
          {/* End of logo replacement */}

        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="https://www.instagram.com/tdmanthan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-pink-500 transition-colors font-medium text-sm lg:text-base"
          >
            <Instagram size={20} />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.youtube.com/@TDManthan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-red-500 transition-colors font-medium text-sm lg:text-base"
          >
            <Youtube size={20} />
            <span>Watch Us on YouTube</span>
          </a>
          <a
            href="https://open.spotify.com/show/YOUR_SHOW_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-colors font-medium text-sm lg:text-base"
          >
            Spotify
          </a>
          <a
            href="https://podcasts.apple.com/podcast/YOUR_PODCAST_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors font-medium text-sm lg:text-base"
          >
            Apple Music
          </a>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-sm border-t border-gray-800">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <a
              href="https://www.instagram.com/tdmanthan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-pink-500 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Instagram size={22} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@TDManthan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-red-500 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Youtube size={22} />
              <span>Watch Us on YouTube</span>
            </a>
            <a
              href="https://open.spotify.com/show/YOUR_SHOW_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-green-500 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Listen on Spotify</span>
            </a>
            <a
              href="https://podcasts.apple.com/podcast/YOUR_PODCAST_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Listen on Apple Music</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}