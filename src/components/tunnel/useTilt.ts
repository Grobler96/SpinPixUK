import { useEffect, useRef, useState } from 'react';

type Orientation = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> };

const RANGE = 18; // degrees of tilt for full effect

/**
 * Phone tilt as -1 to 1 on each axis, measured from however the phone is being held
 * (the resting angle slowly re-centres). Touch devices only.
 * iPhones need a tap to allow motion access: `state` is 'ask' until `enable()` runs from a tap.
 */
export function useTilt(onTilt: (x: number, y: number) => void) {
  const cb = useRef(onTilt);
  cb.current = onTilt;
  const [state, setState] = useState<'off' | 'ask' | 'on'>(() => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return 'off';
    if (!window.matchMedia('(pointer: coarse)').matches) return 'off';
    return typeof (DeviceOrientationEvent as Orientation).requestPermission === 'function' ? 'ask' : 'on';
  });

  useEffect(() => {
    if (state !== 'on') return;
    let base: [number, number] | null = null;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      const angle = screen.orientation?.angle ?? 0;
      // left/right and forward/back, whichever way up the phone is
      const raw: [number, number] =
        angle === 90 ? [e.beta, -e.gamma] : angle === 270 ? [-e.beta, e.gamma] : [e.gamma, e.beta];
      if (!base) base = raw;
      base = [base[0] + (raw[0] - base[0]) * 0.004, base[1] + (raw[1] - base[1]) * 0.004];
      const c = (v: number) => Math.max(-1, Math.min(1, v / RANGE));
      cb.current(c(raw[0] - base[0]), -c(raw[1] - base[1]));
    };
    window.addEventListener('deviceorientation', onOrient);
    return () => window.removeEventListener('deviceorientation', onOrient);
  }, [state]);

  const enable = async () => {
    try {
      const r = await (DeviceOrientationEvent as Orientation).requestPermission?.();
      setState(r === 'granted' ? 'on' : 'off');
    } catch { setState('off'); }
  };

  return { state, enable };
}
