import { getPostBySlug, getPosts } from '@/utils/getPosts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import CommentForm from '@/components/CommentForm';
import LikeButton from '@/components/LikeButton';
import { connectToMongoDB } from '@/utils/db';
import Comment from '@/models/Comment';
import { getCommentTokenFromServerCookies } from '@/utils/commentToken'
// import CommentForm from '@/components/CommentForm';
// import Comment from '@/models/Comment';
// import connectDB from '@/utils/db';

// Calculate reading time
function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

// Generate table of contents from markdown content
function generateTOC(content) {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    // Updated regex to handle markdown formatting characters at the end
    const match = line.match(/^(##?)\s+(.+?)[\s*]*$/);
    if (match) {
      const level = match[1].length - 1; // ## is level 1, ### is level 2
      const text = match[2].trim();
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      headings.push({ level, text, slug });
    }
  });
  
  return headings;
}

// Generate structured data for the article
function generateStructuredData(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    keywords: post.keywords,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author ? {
      '@type': 'Person',
      name: post.author
    } : undefined,
    image: post.coverImage || 'https://thebubbletrends.com/default-blog-image.jpg',
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'BUBBLE TRENDS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thebubbletrends.com/logo.png'
      }
    }
  };
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | BUBBLE TRENDS`,
    description: post.description,
    keywords: post.keywords,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: post.coverImage || 'https://thebubbletrends.com/default-blog-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage || 'https://thebubbletrends.com/default-blog-image.jpg'],
    },
  };
}

export default async function BlogPost({ params }) {
  try {
    await connectToMongoDB();

    console.log("Fetching comments for post:", params.slug);

    const post = getPostBySlug(params.slug);

    const readingTime = getReadingTime(post.content);
    const structuredData = generateStructuredData(post, `https://thebubbletrends.com/blog/${params.slug}`);
    const tableOfContents = generateTOC(post.content);

    // Fetch comments for this post
    console.log("Fetching comments for post:", params.slug);
    const comments = await Comment.find({ 
      postSlug: params.slug, 
      // Only show approved comments in production
      // ...(process.env.NODE_ENV === 'production' ? { status: 'approved' } : {})
    }).sort({ createdAt: -1 });
    
    console.log("Comments found:", comments.length);
    console.log("Comments details:", comments.map(c => ({
      id: c._id,
      name: c.author.name,
      status: c.status,
      content: c.content
    })));

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image
                  src={post.coverImage || '/images/default-blog.jpg'}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="px-4 py-10">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{readingTime} min read</span>
                    <LikeButton postSlug={params.slug} />
                  </div>
                </div>

                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                    <nav>
                      <ul className="space-y-2">
                        {tableOfContents.map((heading) => (
                          <li
                            key={heading.slug}
                            className={`${
                              heading.level === 2 ? 'ml-0' : 'ml-4'
                            }`}
                          >
                            <a
                              href={`#${heading.slug}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Content Section */}
                <div className="px-4 py-10">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="prose lg:prose-xl max-w-none"
                    components={{
                      h2: ({node, children, ...props}) => {
                        const slug = children
                          .toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        return (
                          <h2 {...props} id={slug} className="text-3xl font-bold mt-8 mb-4 text-gray-900 scroll-mt-20">
                            {children}
                          </h2>
                        );
                      },
                      h3: ({node, children, ...props}) => {
                        const slug = children
                          .toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        return (
                          <h3 {...props} id={slug} className="text-2xl font-bold mt-6 mb-3 text-gray-800 scroll-mt-20">
                            {children}
                          </h3>
                        );
                      },
                      p: ({node, ...props}) => <p {...props} className="mb-4 text-gray-700 leading-relaxed" />,
                      ul: ({node, ...props}) => <ul {...props} className="list-disc pl-6 mb-4 text-gray-700" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-6 mb-4 text-gray-700" />,
                      li: ({node, ...props}) => <li {...props} className="mb-2" />,
                      a: ({node, ...props}) => <a {...props} className="text-blue-600 hover:text-blue-800 underline" />,
                      blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-gray-200 pl-4 italic my-4" />,
                      code: ({node, ...props}) => <code {...props} className="bg-gray-100 rounded px-2 py-1 text-sm" />,
                      iframe: ({node, ...props}) => (
                        <div className="my-8">
                          <iframe {...props} className="w-full rounded-lg shadow-lg" />
                        </div>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          </div>
        </div>

        <section>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Comments</h2>
          
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <div 
                key={comment._id.toString()} 
                className={`mb-4 p-4 rounded-lg ${
                  comment.status === 'pending' 
                    ? 'bg-yellow-50 border-yellow-200 border' 
                    : 'bg-white border-gray-200 border'
                }`}
              >
                <div className="flex items-center mb-2">
                  <p className="font-semibold mr-2">{comment.author.name}</p>
                  {comment.status === 'pending' && (
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                      Pending Approval
                    </span>
                  )}
                </div>
                <p>{comment.content}</p>
                <small className="text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          )}

          <CommentForm />
        </div>
        </section>

        <div className="mt-4">
          <LikeButton postSlug={params.slug} />
        </div>
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
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
