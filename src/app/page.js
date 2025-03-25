import { AD_SLOTS } from "@/components/ads/adConstants";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";
import { AdUnit } from "@/components/ads/AdUnit";
import Image from "next/image";
import Link from "next/link";

// bg-[#E21F26] text-[antiquewhite]

const AdComponent = process.env.NODE_ENV === "development" ? AdPlaceholder : AdUnit;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E21F26] text-[antiquewhite]">
    {/* Header Ad */}
      <div className="w-full flex justify-center px-4">
        <AdComponent adSlot={AD_SLOTS.HEADER_AD} adFormat="horizontal" />
      </div>

    <div className="flex-grow container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
      <aside className="hidden lg:flex lg:w-1/4 justify-center lg:justify-end">
          <div className="sticky top-4">
            <AdComponent adSlot={AD_SLOTS.SIDEBAR_AD} adFormat="vertical" />
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-grow lg:w-3/4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl mb-10">Bubble Trends</h1>
            <p className="text-lg leading-relaxed mb-6">
              FREE Tool that gives you the latest Redbubble popular trends, updated
              <strong> EVERYDAY!</strong> Get the most popular and trending keywords on Redbubble that
              will help you get more sales!
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Now, <strong>generate images with AI</strong>! Use our AI Image Generator to create
              amazing designs in seconds. <strong>Try it out now!</strong>
            </p>

            {/* Start For Free Button */}
            <Link
              href="/trends"
              className="inline-block px-8 py-4 border-2 border-[antiquewhite] text-xl font-bold rounded-lg text-[antiquewhite] bg-[#E21F26] hover:text-[#242424] hover:bg-[antiquewhite] transition-all duration-300"
            >
              Start For Free
            </Link>

            {/* In-Article Ad */}
            <div className="mt-16 flex justify-center">
              <AdComponent adSlot={AD_SLOTS.IN_ARTICLE_AD} adFormat="rectangle" />
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-1/4 justify-center lg:justify-end">
          <div className="sticky top-4">
            <AdComponent adSlot={AD_SLOTS.SIDEBAR_AD} adFormat="vertical" />
          </div>
        </aside>
      </div>
    </div>

    {/* Footer */}
    <footer className="w-full mt-auto">
      {/* Footer Ad */}
      <div className="w-full flex justify-center px-4">
        <AdComponent adSlot={AD_SLOTS.HEADER_AD} adFormat="horizontal" />
      </div>
      
      <div className="py-6 bg-[#E21F26]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 mb-4">
            <Link href="/about" className="hover:underline transition-colors">About</Link>
            <Link href="/contact" className="hover:underline transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:underline transition-colors">Terms of Service</Link>
          </div>
          <p className="text-center">
            &copy; Bubble Trends {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  </div>
  );
}
