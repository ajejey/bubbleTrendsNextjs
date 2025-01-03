'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;
  
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Build breadcrumb items with proper formatting
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;
    const label = segment
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    // If it's a blog post (has a slug), get the actual title
    const isBlogPost = segment.match(/^[a-z0-9-]+$/);
    const displayLabel = isBlogPost && isLast ? 'Current Post' : label;
    
    return {
      href,
      label: displayLabel,
      isLast
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link 
            href="/"
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {breadcrumbs.map(({ href, label, isLast }, index) => (
          <li key={href} className="flex items-center">
            <ChevronRightIcon 
              className="h-5 w-5 flex-shrink-0 text-gray-400" 
              aria-hidden="true" 
            />
            {isLast ? (
              <span 
                className="ml-2 text-sm font-medium text-gray-700"
                aria-current="page"
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
