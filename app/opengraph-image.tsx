import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'S.K. Degree & P.G. College';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #001A33, #003366)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#D4AF37',
            color: '#003366',
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            fontSize: '60px',
            fontWeight: 900,
            marginBottom: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          SK
        </div>
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: 'white',
            margin: '0 0 20px 0',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          S.K. Degree & P.G. College
        </h1>
        <p
          style={{
            fontSize: '40px',
            color: '#D4AF37',
            margin: 0,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Tradition of Excellence Since 1995
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
