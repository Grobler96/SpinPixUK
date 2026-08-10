import Breadcrumbs from '@/components/Breadcrumbs';
import { site } from '@/config/site';
import { useSEO } from '@/lib/useSEO';

export default function Terms() {
  useSEO('Terms of Service', 'Terms and conditions for booking SpinPix UK photo booth hire services.');
  return (
    <article className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ice mt-8 mb-8">Terms of Service</h1>
        <div className="space-y-6 text-silver/70 leading-relaxed">
          <p className="text-sm text-silver/50">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>These terms govern the hire of photo booth and video booth services from {site.name} ("we", "us", "our"). By booking a service you agree to these terms.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Bookings and deposits</h2>
          <p>A £75 deposit is required to secure your date. The balance is due 14 days before the event. Deposits are non-refundable but may be transferred to another available date with at least 7 days' notice.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Cancellation</h2>
          <p>If you cancel within 14 days of the event, the full balance remains payable. If we cancel (e.g. due to circumstances beyond our control), we will refund all payments made.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Our responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Deliver, set up and collect the equipment at the agreed time and venue.</li>
            <li>Provide a trained attendant for the duration of the booking.</li>
            <li>Provide a private online gallery within 48 hours of the event.</li>
            <li>Maintain £5 million public liability insurance.</li>
          </ul>
          <h2 className="font-display font-semibold text-xl text-ice">Your responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide a safe, level setup area with power within 5 metres.</li>
            <li>Ensure guests use the equipment responsibly.</li>
            <li>Inform us of any venue access restrictions or requirements.</li>
          </ul>
          <h2 className="font-display font-semibold text-xl text-ice">Content and copyright</h2>
          <p>You retain ownership of all photos and videos captured. We may use anonymised content for marketing unless you opt out in writing. We are not liable for the content guests create.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Liability</h2>
          <p>Our liability is limited to the amount paid for the booking. We are not liable for indirect or consequential losses.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Contact</h2>
          <p>For questions about these terms, email {site.email} or call {site.phone}.</p>
        </div>
      </div>
    </article>
  );
}
