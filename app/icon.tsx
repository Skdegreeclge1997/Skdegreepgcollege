import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'S.K. Degree & P.G. College';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#003366', // academic-navy
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37', // academic-gold
          fontWeight: 900,
          borderRadius: '20%',
          fontFamily: 'sans-serif',
        }}
      >
        SK
      </div>
    ),
    {
      ...size,
    }
  );
}
