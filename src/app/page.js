import Image from "next/image";
import Link from "next/link";

// bg-[#E21F26] text-[antiquewhite]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E21F26] text-[antiquewhite]">
    <div className="flex-grow flex flex-col items-center justify-center w-4/5 mx-auto p-6">
      <header className="w-full flex justify-end gap-10 mb-8">
        {/* Add header content here if needed */}
      </header>

      <main className="text-center my-10">
        <h1 className="text-7xl mb-10">Bubble Trends</h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto">
          FREE Tool that gives you the latest Redbubble popular trends, updated
          <strong> EVERYDAY!</strong> Get the most popular and trending keywords on Redbubble that
          will help you get more sales!
        </p>

        {/* Start For Free Button */}
        <p className="mt-6">
          <Link
            href="/trends"
            className="inline-block px-6 py-3 border border-[antiquewhite] text-lg font-bold rounded-md text-[antiquewhite] bg-[#E21F26]  hover:text-[#242424] hover:bg-[antiquewhite] transition"
          >
            Start For Free
          </Link>
        </p>
      </main>
    </div>

    {/* Footer */}
    <footer className="w-full text-center py-4 mt-auto">
      <p>
        Bubble Trends © {new Date().getFullYear()}
      </p>
    </footer>
  </div>
  );
}
