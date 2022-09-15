export const loader = () => {
  const robotText = `
        User-agent: Googlebot

        User-agent: *
        Allow: /
    
        Sitemap: https://simonboisset.com/sitemap.xml
        `;

  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
