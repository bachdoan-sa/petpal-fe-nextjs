import { Check, Clock, User } from 'react-feather';
import clsx from 'clsx';

export default function KCenterStatus({ status }: { status: string }) {
  return (
    <span 
        style={{fontSize: '0.75rem'}}
      className={clsx(
        'd-inline-flex align-items-center rounded px-2 py-1',
        {
          'bg-gray-100 text-gray-500': status === 'DEACTIVE',
          'bg-light-yellow text-black': status === 'PENDING',
          'bg-green-500 text-white': status === 'ACTIVE',
        },
      )}
    >
      {status === 'PENDING' ? (
        <>
          Pending
          <Clock className="ms-1 text-black" width={16}/>
        </>
      ) : null}
      {status === 'ACTIVE' ? (
        <>
          Paid
          <Check className="ms-1 text-white" width={16} />
        </>
      ) : null}
      {status === '' ? (
        <>
          Empty
          <User className="ms-1 text-white" width={16} />
        </>
      ) : null}
    </span>
  );
}
