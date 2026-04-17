import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sk-degree-college.vercel.app';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/academics`, lastModified: new Date() },
    { url: `${baseUrl}/admissions`, lastModified: new Date() },
    { url: `${baseUrl}/faculty`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/achievements`, lastModified: new Date() },
    { url: `${baseUrl}/notices`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
