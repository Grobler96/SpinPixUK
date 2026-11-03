import { useEffect, useState } from 'react';

/** Turns a link into a QR code image (PNG data URL). Generated in the browser; nothing is sent anywhere. */
export function useQr(text: string, width = 720) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    let cancelled = false;
    if (!text) { setUrl(''); return; }
    import('qrcode')
      .then((m) => m.toDataURL(text, { width, margin: 1, errorCorrectionLevel: 'M', color: { dark: '#07050C', light: '#FFFFFF' } }))
      .then((u) => { if (!cancelled) setUrl(u); })
      .catch(() => { if (!cancelled) setUrl(''); });
    return () => { cancelled = true; };
  }, [text, width]);
  return url;
}
