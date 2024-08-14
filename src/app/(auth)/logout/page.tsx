"use client";

import authApiRequest from "@/src/apiRequests/auth";
import { useAppContext } from "@/src/app/app-provider";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useAppContext();

  const searchParams = useSearchParams();
  const sessionToken = searchParams?.get("sessionToken");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === localStorage.getItem("sessionToken")) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          setUser(null);
          // router.push(`/login?redirectFrom=${pathname}`);
          router.push(`/login`);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathname, setUser]);
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Image
        height={300}
        width={450}
        src={"/assets/images/preloader.gif"}
        alt=""
      />
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
