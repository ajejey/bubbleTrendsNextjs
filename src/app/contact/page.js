import Link from "next/link";

export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <p className="mb-6 text-gray-700 leading-relaxed text-center">
          Have questions about our trending keywords, AI image generation, or need help with your print-on-demand business? We&apos;re here to help!
        </p>
        
        <div className="flex flex-col mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-700">We typically respond within 24-48 hours</p>
          </div>
          <p className="text-2xl font-semibold text-red-600">
            <a href="mailto:thebubbletrends@gmail.com" className="hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              thebubbletrends@gmail.com
            </a>
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Business Hours</h3>
          <p className="text-center text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
        </div>
        
      </section>
      
      <footer className="mt-12 text-sm text-gray-600">
        <div className="flex justify-center space-x-6">
          <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-red-600 transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </main>
  );
}
