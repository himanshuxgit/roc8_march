"use client";
import { checkAuthentication } from "~/utils/Auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const auth = checkAuthentication();
    console.log("auth", auth);
    

    useEffect(() => {
      if (!auth) {
        router.push("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
