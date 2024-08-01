import { Check, Clock, User } from 'react-feather';
import clsx from 'clsx';

export default function KCenterStatus({ status }: { status: string }) {
  return (
    <span 
        style={{fontSize: '0.75rem'}}
      className={clsx(
        'd-inline-flex align-items-center rounded px-2 py-1',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <Clock className="ms-1 text-gray-500" width={16}/>
        </>
      ) : null}
      {status === 'paid' ? (
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
