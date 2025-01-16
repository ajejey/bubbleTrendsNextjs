const { BookOpen } = require("lucide-react");
const { default: Link } = require("next/link");

const BlogPromoSection = ({ latestPosts }) => {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <BookOpen size={32} className="text-[#E21F26]" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Check Out Our Blog!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Discover actionable strategies and practical tips to build sustainable income streams. 
          From digital products to freelancing success – we&apos;ve got you covered!
        </p>
        <div className="space-y-4">
          {latestPosts.slice(0, 3).map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="block hover:underline text-blue-600">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">New</span>
                <span>{post.title}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-6 flex items-center justify-center bg-[#E21F26] text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 w-full"
        >
          <BookOpen className="mr-2" size={18} />
          <span>Read Our Blog</span>
        </Link>
      </div>
    );
  };

  export default BlogPromoSection;
  