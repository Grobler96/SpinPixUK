import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Loader2, AlertCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';
import { services } from '@/data/services';
import { site } from '@/config/site';
import { supabase } from '@/lib/supabase';
import { useSEO } from '@/lib/useSEO';

const eventOptions = ['Weddings', 'Parties', 'Corporate', 'Proms', 'Other'];
const guestRanges = ['Under 50', '50–100', '100–200', '200–400', '400+'];
const durationOptions = ['2 hours', '3 hours', '4 hours', '5+ hours'];

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  service: string;
  guests: string;
  duration: string;
  message: string;
};

const initial: FormData = {
  name: '', email: '', phone: '', eventType: '', eventDate: '',
  venue: '', service: '', guests: '', duration: '', message: '',
};

export default function Contact() {
  useSEO('Contact', 'Get a tailored quote for your SpinPix photo booth hire in under 24 hours.');
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = ['Event details', 'Your booth', 'Your details'];
  const update = (key: keyof FormData, value: string) => setData((d) => ({ ...d, [key]: value }));

  const canNext = () => {
    if (step === 0) return data.eventType && data.eventDate;
    if (step === 1) return data.service;
    return true;
  };

  const submit = async () => {
    if (!data.name || !data.email) {
      setError('Please enter your name and email.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: insertError } = await supabase.from('enquiries').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      event_type: data.eventType,
      event_date: data.eventDate || null,
      venue: data.venue || null,
      service: data.service || null,
      guests: data.guests ? parseInt(data.guests.replace(/[^0-9]/g, '') || '0', 10) || null : null,
      duration: data.duration || null,
      message: data.message || null,
    });
    setSubmitting(false);
    if (insertError) {
      setError('Something went wrong sending your enquiry. Please try again or call us.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-28 px-4">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet/15 blur-[120px]" />
        <div className="relative max-w-lg w-full rounded-2xl glass-strong p-8 sm:p-10 text-center">
          <div className="grid place-items-center w-16 h-16 rounded-full bg-gradient-to-br from-electric to-violet mx-auto mb-6 glow-blue">
            <Check size={32} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ice mb-3">Enquiry sent!</h1>
          <p className="text-silver/70 leading-relaxed mb-6">
            Thanks, {data.name.split(' ')[0]}. We have received your enquiry and will get back to you
            within 24 hours with a tailored quote. For urgent enquiries, call us on {site.phone}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-6 py-3 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors">
              Back home
            </Link>
            <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold">
              <Phone size={16} /> Call now
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-electric/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <SectionHeading
            eyebrow="Get a Quote"
            title="Let's plan your event"
            subtitle="Tell us about your celebration and we will send a tailored quote within 24 hours. No obligation, no pressure."
            align="left"
            className="mt-8"
          />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <div className="rounded-2xl glass-strong p-6 sm:p-8">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className={`grid place-items-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                    i < step ? 'bg-gradient-to-br from-electric to-violet text-white' :
                    i === step ? 'bg-cyan text-ink' : 'glass text-silver/50'
                  }`}>
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium hidden sm:block ${i <= step ? 'text-ice' : 'text-silver/40'}`}>
                    {label}
                  </span>
                  {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-cyan' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-magenta/10 border border-magenta/30 text-sm text-magenta">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Step 0: Event details */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">Event type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eventOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('eventType', opt)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          data.eventType === opt
                            ? 'bg-gradient-to-r from-electric to-violet text-white'
                            : 'glass text-silver/70 hover:text-ice hover:border-cyan/40'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ice mb-2">Event date *</label>
                    <input
                      type="date"
                      value={data.eventDate}
                      onChange={(e) => update('eventDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass text-ice focus:border-cyan/50 focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ice mb-2">Venue / location</label>
                    <input
                      type="text"
                      value={data.venue}
                      onChange={(e) => update('venue', e.target.value)}
                      placeholder="e.g. The Grand Hotel, Leeds"
                      className="w-full px-4 py-3 rounded-xl glass text-ice placeholder:text-silver/40 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">Approximate guests</label>
                  <div className="flex flex-wrap gap-2">
                    {guestRanges.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => update('guests', g)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          data.guests === g
                            ? 'bg-gradient-to-r from-electric to-violet text-white'
                            : 'glass text-silver/70 hover:text-ice hover:border-cyan/40'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Booth */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">Which booth are you interested in? *</label>
                  <div className="grid gap-2">
                    {services.map((s) => (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => update('service', s.name)}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                          data.service === s.name
                            ? 'bg-gradient-to-r from-electric/20 to-violet/20 border border-cyan/40'
                            : 'glass hover:border-cyan/30'
                        }`}
                      >
                        <div className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-electric/20 to-violet/20 text-cyan shrink-0">
                          <Icon name={s.icon} size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ice">{s.name}</p>
                          <p className="text-xs text-silver/60">{s.tagline} · From £{s.priceFrom}</p>
                        </div>
                        {data.service === s.name && <Check size={18} className="text-cyan" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">How long do you need?</label>
                  <div className="flex flex-wrap gap-2">
                    {durationOptions.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => update('duration', d)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          data.duration === d
                            ? 'bg-gradient-to-r from-electric to-violet text-white'
                            : 'glass text-silver/70 hover:text-ice hover:border-cyan/40'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ice mb-2">Full name *</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl glass text-ice placeholder:text-silver/40 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ice mb-2">Phone</label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="07123 456789"
                      className="w-full px-4 py-3 rounded-xl glass text-ice placeholder:text-silver/40 focus:border-cyan/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">Email *</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl glass text-ice placeholder:text-silver/40 focus:border-cyan/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ice mb-2">Anything else we should know?</label>
                  <textarea
                    value={data.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={4}
                    placeholder="Tell us about your theme, timings, special requests..."
                    className="w-full px-4 py-3 rounded-xl glass text-ice placeholder:text-silver/40 focus:border-cyan/50 focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-ice font-semibold hover:border-cyan/40 transition-colors"
                >
                  <ArrowLeft size={17} /> Back
                </button>
              ) : <span />}

              {step < 2 ? (
                <button
                  type="button"
                  disabled={!canNext()}
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_24px_rgba(22,139,255,0.4)] transition-all"
                >
                  Continue <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submit}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric to-violet text-white font-semibold disabled:opacity-60 hover:shadow-[0_0_24px_rgba(22,139,255,0.4)] transition-all"
                >
                  {submitting ? <><Loader2 size={17} className="animate-spin" /> Sending...</> : <><Send size={17} /> Send enquiry</>}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl glass p-6">
              <h3 className="font-display font-semibold text-ice mb-4">Prefer to talk?</h3>
              <div className="space-y-3">
                <a href={site.phoneHref} className="flex items-center gap-3 text-sm text-silver/80 hover:text-cyan transition-colors">
                  <Phone size={16} className="text-cyan" /> {site.phone}
                </a>
                <a href={site.emailHref} className="flex items-center gap-3 text-sm text-silver/80 hover:text-cyan transition-colors">
                  <Mail size={16} className="text-cyan" /> {site.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-silver/80">
                  <MapPin size={16} className="text-cyan mt-0.5" /> {site.address}
                </div>
              </div>
              <p className="text-xs text-silver/50 mt-4 pt-4 border-t border-white/10">{site.hours}</p>
            </div>
            <div className="rounded-2xl glass p-6">
              <h3 className="font-display font-semibold text-ice mb-3">What happens next?</h3>
              <ol className="space-y-3 text-sm text-silver/70">
                <li className="flex gap-3"><span className="grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-electric to-violet text-white text-xs font-bold shrink-0">1</span> We review your enquiry</li>
                <li className="flex gap-3"><span className="grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-electric to-violet text-white text-xs font-bold shrink-0">2</span> Tailored quote within 24 hours</li>
                <li className="flex gap-3"><span className="grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-electric to-violet text-white text-xs font-bold shrink-0">3</span> Secure your date with a deposit</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
