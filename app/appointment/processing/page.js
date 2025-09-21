

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AppointmentProcessingPage() {
  const [statusText, setStatusText] = useState('Verifying your payment...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/status?sessionId=${sessionId}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('Status API error:', res.status);
          return;
        }

        const data = await res.json();

        if (data.appointment?.status === 'Paid') {
          clearInterval(interval);
          setStatusText('✅ Payment successful! Redirecting...');
          setTimeout(() => router.push('/'), 1500);
        } else if (data.appointment?.status === 'Pending') {
          setStatusText('⏳ Payment not yet confirmed. Verifying...');
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        setStatusText('⚠ Verifying payment...');
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [sessionId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black text-center px-4">
      <h2>Loading</h2>
      <p className="mt-8 text-lg font-medium animate-pulse">{statusText}</p>
    </div>
  );
}
