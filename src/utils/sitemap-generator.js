import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const baseUrl = 'https://www.thebubbletrends.com'; // Updated to Bubble Trends domain
  const pages = [
    '/',
    '/ai-image-generator',
    '/privacy-policy',
    '/terms-of-service',
    // Add more pages here
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap generated successfully');
};

export default generateSitemap;
