import supabase from "../utils/supabaseClient";
import { fetchLocationIds } from "../utils/supabaseFunctions";

function generateSiteMap(locations) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://www.healthyfoodmap.com/</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/account</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/forum</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/login</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/editAcount</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/articles</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/createPost</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
  <loc>https://www.healthyfoodmap.com/nutritionsearch</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
  ${locations.map((location) => {
    return `
    <url>
    <loc>https://www.healthyfoodmap.com/farm/${location.id}</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
    </url>
    `;
  })}
    </urlset>
    `;
}

function SiteMap(locations) {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const locations = await fetchLocationIds();
  console.log(locations);
  const sitemap = generateSiteMap(locations);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser]
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;
