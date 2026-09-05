import { ImageResponse } from 'next/og';
import { Car } from 'lucide-react';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb',
          borderRadius: '50%',
        }}
      >
        <Car color="white" size={20} strokeWidth={2.5} />
      </div>
    ),
    { ...size }
  );
}