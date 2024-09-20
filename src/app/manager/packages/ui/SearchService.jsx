'use client';

import { Search } from 'react-feather';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Suspense } from 'react';
//nguồn tham khảo: tutorial nextjs
//hàm này có thể dùng nhiều nơi
function SearchBar({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // function handleSearch(term: string) { 
  //     //code này mỗi lần nhận 1 kí tự sẽ tự động service 1 lần -> tốn tài nguyên
  //     console.log(term);
  //     const params = new URLSearchParams(searchParams);
  //     if (term) {
  //       params.set('service', term);
  //     } else {
  //       params.delete('service');
  //     }
  //     replace(`${pathname}?${params.toString()}`);   
  // }
  const handleSearch = useDebouncedCallback((term) => {
    //Code này cho delay 300ms khi nhập và có thư viện debounced hỗ trọ... nên dùng!
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('service', term);
    } else {
      params.delete('service');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="d-flex flex-grow-1 position-relative">
      <label htmlFor="search" className="visually-hidden">
        Search
      </label>
      <Suspense>
        <input
          className="form-control rounded-lg border-gray-200 py-2 px-7 text-sm"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('service')?.toString()}
        />
      </Suspense>
      <Search className="position-absolute mx-2 top-50 translate-middle-y text-gray-500 focus:text-gray-900" width={18} height={18} />
    </div>
  );
}
export default SearchBar;