import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

function Page({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  useSEO(title, desc);
  return (
    <article className="px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl">{title}</h1>
        <div className="mt-8 space-y-5 text-paper/80 leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          {children}
        </div>
      </div>
    </article>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy Policy" desc="How SpinPix UK collects, uses and protects your personal data.">
      <p>{site.name} respects your privacy. This page explains what we collect through this website and how we use it.</p>
      <h2>What we collect</h2>
      <p>If you send an enquiry we collect the details you give us: name, email, phone number, event details and your message.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide a quote.</li>
        <li>To communicate with you about a booking.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We don’t sell your data. We only share it with service providers that help us run the business (for example, hosting and email) where needed.</p>
      <h2>Your rights</h2>
      <p>Under UK GDPR you can ask to see, correct or delete your data. Email <a className="underline" href={site.emailHref}>{site.email}</a>.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms" desc="Terms for booking SpinPix UK photo booth hire.">
      <p>Hire terms for {site.name}, including deposits, cancellations and liability, are confirmed in your quote and booking confirmation.</p>
      <h2>Bookings</h2>
      <p>A booking is confirmed once we’ve agreed the details and any deposit in writing.</p>
      <h2>Questions</h2>
      <p>Email <a className="underline" href={site.emailHref}>{site.email}</a> or call {site.phone} and we’ll talk you through them.</p>
    </Page>
  );
}

export function Accessibility() {
  return (
    <Page title="Accessibility" desc="SpinPix UK accessibility statement.">
      <p>We want everyone to be able to use this website. We use semantic HTML, keyboard-friendly navigation, visible focus states, labelled form fields and we respect reduced-motion settings.</p>
      <p>If you find something hard to use, email <a className="underline" href={site.emailHref}>{site.email}</a> and we’ll help.</p>
    </Page>
  );
}
