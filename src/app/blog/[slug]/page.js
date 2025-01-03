import { getPostBySlug, getPosts } from '@/utils/getPosts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

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

export default function BlogPost({ params }) {
  try {
    const post = getPostBySlug(params.slug);
    const readingTime = getReadingTime(post.content);
    const structuredData = generateStructuredData(post, `https://thebubbletrends.com/blog/${params.slug}`);
    const tableOfContents = generateTOC(post.content);
    
    return (
      <>
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
              <div className="px-8 py-10">
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
                <div className="px-8 py-10">
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
      </>
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
