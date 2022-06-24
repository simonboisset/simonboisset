export const loader = () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.
  const content = `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://simonboisset.com/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/blog/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/blog/docusaurus-plusieurs-documentations</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/blog/creer-une-app-esbuild-react</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/blog/</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/blog/docusaurus-multi-docs</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/blog/create-esbuild-react-app</loc>
              <lastmod>2022-06-24</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
          </urlset>
      `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
