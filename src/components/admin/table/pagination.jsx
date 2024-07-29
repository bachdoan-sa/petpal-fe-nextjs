'use client';

import { ArrowLeft, ArrowRight } from 'react-feather';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { generatePagination } from '@/src/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages = 1 }) {
  // NOTE: comment in this code when you get to this point in the course
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="d-inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="d-flex -space-x-px">
          {allPages.map((page, index) => {
            let position = undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}) {
  const className = clsx(
    'd-flex align-items-center justify-content-center text-sm border',
    {
      'rounded-start rounded-lg': position === 'first' || position === 'single',
      'rounded-end rounded-lg': position === 'last' || position === 'single',
      'z-10 bg-primary border-primary text-white': isActive,
      'hover-bg-gray': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className} style={{width:"2.5rem",height:"2.5rem"}}>{page}</div>
  ) : (
    <Link href={href} className={className} style={{width:"2.5rem",height:"2.5rem"}}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}) {
  const className = clsx(
    'd-flex align-items-center justify-content-center rounded rounded-lg border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover-bg-gray': !isDisabled,
      'me-4': direction === 'left',
      'ms-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeft className="w-4" />
    ) : (
      <ArrowRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className} style={{width:"2.5rem",height:"2.5rem"}}>{icon}</div>
  ) : (
    <Link className={className} style={{width:"2.5rem",height:"2.5rem"}} href={href}>
      {icon}
    </Link>
  );
}
