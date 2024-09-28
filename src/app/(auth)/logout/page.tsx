"use client";

import authApiRequest from "@/src/apiRequests/auth";
import { useAppContext } from "@/src/app/app-provider";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, isAuthenticated } = useAppContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    authApiRequest.logoutFromNextClientToNextServer(true, signal)
      .then((res) => {
        setUser(null);
        console.log("return: "+ JSON.stringify(res));
        // router.push(`/login?redirectFrom=${pathname}`);
        router.refresh();
        setTimeout(() => {
          router.push(`/login`);
        }, 300)
      });

    return () => {
      controller.abort();
    };
  }, [ router, pathname, setUser]);
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
