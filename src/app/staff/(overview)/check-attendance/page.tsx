import React from "react";
import TableCheckAttendance from "./TableCheckAttendance";
import { cookies } from "next/headers";

export default function CheckAttendance({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page ?? 1);
  return (
    <div>
      <TableCheckAttendance sessionToken={sessionToken} currentPage={currentPage} query={query} />
    </div>
  );
}
