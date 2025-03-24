import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
  <h1 className="text-4xl font-bold mb-8 text-center">About Bubble Trends</h1>
  
  <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
    <h2 className="text-2xl font-semibold mb-6 text-red-600">Our Story</h2>
    <p className="mb-4 text-gray-700 leading-relaxed">
      Founded in 2020, Bubble Trends is your go-to source for trending keywords in the print-on-demand industry. We&apos;ve evolved from a simple keyword research tool to a comprehensive platform serving designers worldwide.
    </p>
    <p className="mb-4 text-gray-700 leading-relaxed">
      Our mission is to empower creators by providing daily updates on the hottest keywords trending on Redbubble. We&apos;re passionate about helping you maximize your sales and turn your creativity into success.
    </p>
    <p className="mb-4 text-gray-700 leading-relaxed">
      We hope Bubble Trends becomes an invaluable asset in your design journey. Your growth and success are what drive us to continually improve and innovate.
    </p>
    <p className="italic text-gray-600">
      Warm regards,<br />
      The Bubble Trends Team
    </p>
  </section>
  
  <footer className="mt-12 text-sm text-gray-600">
    <p className="text-center mb-6">
      Questions or suggestions? Reach out to us at:<br />
      <a href="mailto:thebubbletrends@gmail.com" className="text-red-600 hover:underline">thebubbletrends@gmail.com</a>
    </p>
    <div className="flex justify-center space-x-6">
      <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
      <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
      <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
      <Link href="/terms-and-conditions" className="hover:text-red-600 transition-colors">Terms of Service</Link>
    </div>
  </footer>
</div>
  );
}
