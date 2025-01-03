'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-[#E21F26] z-10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-[antiquewhite] font-bold text-2xl">
            BubbleTrends
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-[#c91b21] rounded-lg text-[antiquewhite]"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-[antiquewhite] hover:underline transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/ai-image-generator" 
              className="text-[antiquewhite] hover:underline transition-colors"
            >
              AI Image Generator
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden mt-4 space-y-4 pb-4`}
        >
          <Link 
            href="/blog" 
            className="block py-2 px-4 text-[antiquewhite] hover:bg-[#c91b21] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/ai-image-generator" 
            className="block py-2 px-4 text-[antiquewhite] hover:bg-[#c91b21] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Image Generator
          </Link>
        </div>
      </nav>
    </header>
  );
}