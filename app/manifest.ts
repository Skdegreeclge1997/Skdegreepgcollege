import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'S.K. Degree & P.G. College',
    short_name: 'S.K. College',
    description: 'Official portal of S.K. Degree & P.G. College, Vizianagaram.',
    start_url: '/',
    display: 'standalone',
    background_color: '#001F3F',
    theme_color: '#001F3F',
    icons: [
      {
        src: '/images/logo.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  };
}
