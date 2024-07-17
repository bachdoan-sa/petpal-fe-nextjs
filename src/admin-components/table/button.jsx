import { Plus, Edit3, Trash2 } from 'react-feather';
import Link from 'next/link';

export function CreateButton({ link }) {
    return (
        <Link
            href={link ? link : "#"}
            className="btn btn-primary d-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus-ring-2 focus-ring-offset-2 focus-ring-blue-600"
        >
            <span className="hidden md:block">Create user</span>{' '}
            <Plus className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateButton({ id, link }) {
    return (
        <Link
            href={link ? link : "#"}
            className=" border p-1 me-1 table-button-action"
        >
            <Edit3 className="w-5" />
        </Link>
    );
}

export function DeleteButton({ id, link }) {
    return (
        <>
            <button className=" border p-1 table-button-action">
                <span className="sr-only">Delete</span>
                <Trash2 className="w-5" />
            </button>
        </>
    );
}