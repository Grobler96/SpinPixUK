import Breadcrumbs from '@/components/Breadcrumbs';
import { useSEO } from '@/lib/useSEO';

export default function Accessibility() {
  useSEO('Accessibility', 'SpinPix UK accessibility statement and commitment to an inclusive website.');
  return (
    <article className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: 'Accessibility' }]} />
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ice mt-8 mb-8">Accessibility Statement</h1>
        <div className="space-y-6 text-silver/70 leading-relaxed">
          <p>SpinPix UK is committed to making our website accessible to everyone, including people with disabilities. We aim to meet WCAG 2.1 AA standards.</p>
          <h2 className="font-display font-semibold text-xl text-ice">What we do</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use semantic HTML and ARIA landmarks for screen reader compatibility.</li>
            <li>Maintain a colour contrast ratio of at least 4.5:1 for body text.</li>
            <li>Provide visible focus indicators for keyboard navigation.</li>
            <li>Respect the prefers-reduced-motion setting for all animations.</li>
            <li>Ensure all interactive elements are operable with a keyboard.</li>
            <li>Label all form fields and provide descriptive error messages.</li>
          </ul>
          <h2 className="font-display font-semibold text-xl text-ice">Known limitations</h2>
          <p>Some third-party images may not have detailed alt text. If you encounter an accessibility barrier, please let us know and we will address it promptly.</p>
          <h2 className="font-display font-semibold text-xl text-ice">Feedback</h2>
          <p>If you have difficulty using our website, email hello@spinpix.co.uk and we will do our best to help.</p>
        </div>
      </div>
    </article>
  );
}
