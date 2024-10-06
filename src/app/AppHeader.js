import { PiggyBank } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="sticky top-0 bg-[#E21F26] p-4 z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="text-[antiquewhite] font-bold text-2xl">
          BubbleTrends
        </Link>
        <div className="flex items-center space-x-4">
          {/* <a
            href="https://paypal.me/bubbletrends/10USD"
            className="bg-[antiquewhite] text-gray-700 flex items-center gap-2 font-bold text-lg px-6 py-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PiggyBank size={28} />
            Leave a Tip
          </a> */}
          <Link href="/ai-image-generator" className="text-[antiquewhite] hover:underline ">
            AI Image Generator
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;