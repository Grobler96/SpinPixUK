import Breadcrumbs from '@/components/Breadcrumbs';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function Privacy() {
  useSEO('Privacy Policy', 'How SpinPix UK collects, uses and protects your personal data.');
  return (
    <article className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ice mt-8 mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-silver/70 leading-relaxed">
          <p className="text-sm text-silver/50">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>{site.name} ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use and share your personal data when you use our website and services.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Data we collect</h2>
          <p>When you submit an enquiry form we collect your name, email address, phone number, event details (type, date, venue, guest count) and any message you provide. We also collect basic analytics data such as page views via cookies.</p>
          <h2 className="font-display font-semibold text-xl text-ice">How we use your data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to your enquiry and provide a quote.</li>
            <li>To communicate with you about your booking.</li>
            <li>To deliver your event gallery after your booking.</li>
            <li>To improve our services and website.</li>
          </ul>
          <h2 className="font-display font-semibold text-xl text-ice">Legal basis</h2>
          <p>We process your data under the legitimate interest of providing our services and responding to your enquiries, and under contract once a booking is confirmed.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Data sharing</h2>
          <p>We do not sell your data. We may share it with trusted third-party service providers (e.g. our booking system and email provider) who process data on our behalf under strict contractual safeguards.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Your rights</h2>
          <p>Under UK GDPR you have the right to access, correct, delete or restrict the processing of your personal data, and to data portability. To exercise these rights, email {site.email}.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Data retention</h2>
          <p>We retain enquiry data for up to 24 months and booking records for 7 years for accounting purposes.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Cookies</h2>
          <p>Our website uses essential cookies for functionality and optional analytics cookies. You can control cookies via your browser settings.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Contact</h2>
          <p>For any privacy questions, contact us at {site.email} or {site.address}.</p>
        </div>
      </div>
    </article>
  );
}
