import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { site } from '@/config/site';
import Confetti from './Confetti';

export default function AnimatedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-ink to-ink" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-electric/15 blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-magenta/15 blur-[100px]" />

      {/* Disco ball */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full disco-ball animate-spin-slow" />
          {/* Light beams */}
          <div className="absolute -inset-32 pointer-events-none">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 origin-left h-px w-40 bg-gradient-to-r from-cyan/40 to-transparent"
                style={{ transform: `rotate(${deg}deg)`, animation: `spin-slow ${8 + (deg % 4)}s linear infinite` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Confetti */}
      <Confetti count={50} />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8 animate-float-y">
          <div className="flex" aria-hidden>
            {[0,1,2,3,4].map((i) => <Star key={i} size={14} className="fill-magenta text-magenta" />)}
          </div>
          <span className="text-sm text-silver/80">
            {site.rating} · {site.reviewCount} happy clients
          </span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ice mb-6">
          Capture the moment.
          <br />
          <span className="text-gradient">Spin the fun.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-silver/80 leading-relaxed mb-10">
          Premium interactive photo booths and 360° video booths for weddings, parties,
          corporate events and proms across the UK. Professional setup, friendly attendants,
          instant sharing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold hover:shadow-[0_0_30px_rgba(22,139,255,0.5)] transition-all"
          >
            Get your instant quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors"
          >
            Explore experiences
          </Link>
        </div>

        {/* Floating photo cards */}
        <div className="mt-16 flex justify-center gap-3 sm:gap-5 flex-wrap">
          {[
            { src: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Photo booth fun', rot: '-6deg', delay: '0s' },
            { src: 'https://images.pexels.com/photos/4946525/pexels-photo-4946525.jpeg?auto=compress&cs=tinysrgb&w=200', alt: '360 video booth', rot: '4deg', delay: '0.5s' },
            { src: 'https://images.pexels.com/photos/3754253/pexels-photo-3754253.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Glam booth', rot: '-3deg', delay: '1s' },
            { src: 'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=200', alt: 'Party booth', rot: '5deg', delay: '1.5s' },
          ].map((card, i) => (
            <div
              key={i}
              className="w-28 sm:w-36 rounded-2xl overflow-hidden glass neon-edge animate-float-y"
              style={{ transform: `rotate(${card.rot})`, animationDelay: card.delay }}
            >
              <img src={card.src} alt={card.alt} loading="lazy" className="w-full h-36 sm:h-44 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
