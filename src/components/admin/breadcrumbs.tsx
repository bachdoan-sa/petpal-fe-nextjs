import { clsx } from 'clsx';
import Link from 'next/link';
import { inter, lusitana } from '@/src/fonts/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  color?: string;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 d-block">
      <ol className={clsx(inter.className, 'd-flex text-2xl', 'ps-0')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              "list-style-none",
              (breadcrumb.color === 'white' ? 'text-white' : (breadcrumb.active ? 'text-gray-900' : 'text-gray-500'))
            )}
          >
            <Link href={breadcrumb.href} className='text-reset'>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 d-inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
