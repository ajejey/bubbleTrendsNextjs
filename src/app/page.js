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

      {/*  */}

      <main className="text-center my-10">
        <h1 className="text-7xl mb-10">Bubble Trends</h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto">
        FREE Tool that gives you the latest Redbubble popular trends, updated
          <strong> EVERYDAY!</strong> Get the most popular and trending keywords on Redbubble that
          will help you get more sales!
        </p>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto mt-6">
          Now, <strong>generate images with AI</strong>! Use our AI Image Generator to create
          amazing designs in seconds. <strong>Try it out now!</strong>
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
    <footer className="w-full text-center py-6 mt-auto  bg-[#E21F26]">
      <div className="flex justify-center space-x-6 mb-4">
        <Link href="/about" className="hover:underline transition-colors">About</Link>
        <Link href="/contact" className="hover:underline transition-colors">Contact</Link>
        <Link href="/privacy" className="hover:underline transition-colors">Privacy Policy</Link>
        <Link href="/terms-and-conditions" className="hover:underline transition-colors">Terms of Service</Link>
      </div>
      <p>
        Bubble Trends © {new Date().getFullYear()}
      </p>
    </footer>
  </div>
  );
}
