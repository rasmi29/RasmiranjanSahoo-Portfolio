import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Certificates - Rasmiranjan Sahoo',
  description: 'Professional certificates and achievements',
};

const certificates = [
  {
    id: '109933252142981710249854',
    title: 'Web Development Certificate',
    issuer: 'Chai Code',
    issuedOn: '31 July 2025',
    image: '/mern-certificate.png',
    verifyUrl: 'https://courses.chaicode.com/learn/certificate/10993325-214298',
  },
  {
    id: 'LO6148UTS7YI',
    title: 'Frontend Development by Meta',
    issuer: 'Coursera',
    issuedOn: '7 Oct 2024',
    image: '/frontend-certificate.png',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/LO6148UTS7YI',
  },
  // Add more certificates here as needed
];

export default function CertificatesPage() {
  return (
    <>

      <main className="min-h-screen py-24">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 dark:text-neutral-100">Certificates</h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">Selected professional certificates and issued dates.</p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((c) => (
              <article key={c.id} className="bg-white dark:bg-neutral-900 border rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-56">
                  <Image src={c.image} alt={`${c.issuer} - ${c.title}`} fill className="object-cover" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{c.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{c.issuer}</p>
                  <p className="text-xs text-neutral-400 mt-2">Issued on {c.issuedOn}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <Link href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-xs border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors rounded">
                      Verify
                    </Link>
                    <span className="inline-block text-xs text-neutral-500">•</span>
                    <span className="text-xs text-neutral-500">Digital badge available</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

    </>
  );
}